const Registration = require("../models/registrationModel");
const multer = require('multer');
const fs = require('fs');
// const { sendRegistrationEmail } = require('../config/mailersend');


exports.newRegistration = async (req, res, next) => {

    try {

        let registrationDetails = req.body;
        // const userEmail = req.body.email;

        let allFiles = req.files;

        // console.log(registrationDetails);

        if (!validatePersonalDetails(registrationDetails)) {
            // Remove uploaded files(undo)
            for (var files of Object.keys(allFiles)) {
                for (const file of allFiles[files]) {
                    fs.unlinkSync(file.path);
                }
            }


            return res.status(400).json({
                status: "error",
                message: "Personal details error!"
            })
        }

        //email exists?
        const userEmail = await Registration.findOne({email : registrationDetails.email})
        if (userEmail != null){
            return res.json({
                'status' : 'error',
                'message' : 'Email already exists.'
            });
        }

        if (!validateEventDetails(registrationDetails)) {
            // Remove uploaded files(undo)
            for (var files of Object.keys(allFiles)) {
                for (const file of allFiles[files]) {
                    fs.unlinkSync(file.path);
                }
            }

            return res.status(400).json({
                status: "error",
                message: "Event details error!"
            })
        }

        //update email to lower case
        registrationDetails.email = String(registrationDetails.email).toLowerCase();

        let dataObj = reformatData(registrationDetails, allFiles)

        //create registration
        await Registration.create(dataObj);
        // await sendRegistrationEmail(userEmail);

        return res.json({
            status: "success",
            message: "Thank you for registering for IMOlympiad. Your registration has been successfully completed."
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "internal-server-error",
            message: "Server error! please try again later."
        })
        // next('Registration controller error')
    }
};

function validatePersonalDetails(data) {
    const itemsToValidate = ["name", "FatherName", "ContactNumber", "email", "cnic"]

    //ignore validation for student id if not ims student
    if (data["studentType"] == "yes" && data["studentId"] == '') {
        return false
    }

    //validate all fields are filled
    for (const item of itemsToValidate) {
        if (data[item] == '') {
            return false;
        }
    }
    return true;
}

function validateEventDetails(data) {
    const registerAs = ["observer", "participant", "participantAndSocialEvent"]
    const sports = ["Futsal", "Basketball", "Badminton", "TableTennis", "BoardGames", "EGaming", "ParliamentarySummit"]

    //validate register as:
    if (!registerAs.includes(data["RegisterAs"])) {
        return false;
    }

    //for observer no need for sports
    if (data["RegisterAs"] == 'observer') {
        return true
    }

    //make sure atleast 1 sport is selected
    for (const sport of sports) {
        if (sport in data) {
            return true
        }
    }
    return false;
}

function reformatData(data, allFiles) {
    let newData = {
        name: data.name,
        father_name: data.FatherName,
        contact_number: data.ContactNumber,
        email: data.email,
        cnic: data.cnic,
        is_ims_student: data.studentType,
        student_id_no: (function () {
            if (data.studentId) return data.studentId
        }()),
        register_as: data.RegisterAs,
        total_amount: data.totalAmount,
        ambassador_name: data.ambassador
    };

    let selectedSports = []
    if (data["Futsal"] && data["FutsalPlayers"]) {

        let playersData = []
        for (let i = 1; i <= Number(data["FutsalPlayers"]); i++) {
            playersData.push({
                ims_student: data[`playerType${i}`],
                player_name: data[`playerName${i}`],
                player_contact: data[`playerContact${i}`],
                player_cnic: data[`playerCnic${i}`],
            });
        }
        selectedSports.push({
            sport_name: data["Futsal"],
            players: data["FutsalPlayers"],
            players_data: playersData
        })
    }

    if (data["Basketball"] && data["BasketballPlayers"]) {
        let playersData = []
        for (let i = 1; i <= Number(data["BasketballPlayers"]); i++) {
            playersData.push({
                ims_student: data[`basketballPlayerType${i}`],
                player_name: data[`basketballPlayerName${i}`],
                player_contact: data[`basketballPlayerContact${i}`],
                player_cnic: data[`basketballPlayerCnic${i}`],
            });
        }

        selectedSports.push({
            sport_name: data["Basketball"],
            players: data["BasketballPlayers"],
            players_data: playersData
        })
    }

    if (data["Badminton"] && data["matchType"]) {
        let player2Data = {}
        if (data["matchType"] == 'double') {
            player2Data.ims_student = data[`badmintonSecondPlayerType`];
            player2Data.player_name = data[`badmintonSecondPlayerName`];
            player2Data.player_contact = data[`badmintonSecondPlayerContact`];
            player2Data.player_cnic = data[`badmintonSecondPlayerCnic`]

        }
        selectedSports.push({
            sport_name: data["Badminton"],
            matchType: data["matchType"]
        })
    }

    if (data["BoardGames"]) {
        selectedSports.push({
            sport_name: data["BoardGames"],
            selected_games: (function () {
                let games = [];
                if (data["Ludo"]) {
                    games.push(data["Ludo"])
                }
                if (data["Chess"]) {
                    games.push(data["Chess"])
                }
                if (data["Carrom"]) {
                    games.push(data["Carrom"])
                }
                return games
            }())
        })
    }

    if (data["EGaming"]) {
        selectedSports.push({
            sport_name: data["EGaming"],
            selected_games: (function () {
                let games = [];
                if (data["Tekken"]) {
                    games.push(data["Tekken"])
                }
                if (data["Fifa"]) {
                    games.push(data["Fifa"])
                }
                return games
            }())
        })
    }

    if (data["ParliamentarySummit"]) {
        selectedSports.push({
            sport_name: data["ParliamentarySummit"],
            experience: (function () {
                if (data["experience"]) {
                    return data["experience"]
                } else {
                    return '0';
                }
            }()),
            leader_of_house: data["LeaderOfHouse"]
        })
    }
    newData.sport_registered_in = selectedSports;

    //getting images paths and storing in db
    let imagesPaths = []
    for (var files of Object.keys(allFiles)) {

        //creating individual object for images
        let imagesObj = {};
        let fieldName = files.toString();
        let pathsArr = []

        for (const file of allFiles[files]) {
            pathsArr.push({ path: file.path })
        }

        imagesObj[fieldName] = pathsArr;
        imagesPaths.push(imagesObj);
    }

    newData.images_paths = imagesPaths
    return newData;
}

//Multer
//Multer storage configuration

//create folder for each submission
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let imageFolder = new Date().toLocaleDateString().replace(/\//g, '-');
        let imagePath = 'uploads/' + imageFolder;

        fs.mkdirSync(imagePath, { recursive: true })
        cb(null, imagePath); // Destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Renaming file to avoid conflicts
    }
});

// File filter function to allow only .png and .jpg files
const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb('INVALID_TYPE', false);
    }
    cb(null, true);
};


// Function to handle file upload
exports.uploadFiles = function (req, res, next) {
    // Multer configuration
    const upload = multer({
        storage: storage,
        limits: { fileSize: 0.5 * 1024 * 1024 }, // Limiting file size to 500KB
        fileFilter: fileFilter
    }).fields(
        [
            {
                name: 'studentIdImage',
                maxCount: 1
            },
            {
                name: 'studentImage',
                maxCount: 1
            },
            {
                name: 'cnicImage',
                maxCount: 1
            },
            {
                name: 'playerID',
                maxCount: 8
            },
            {
                name: 'playerImage',
                maxCount: 8
            },
            {
                name: 'playerCnicImg',
                maxCount: 8
            },
            {
                name: 'basketballPlayerID',
                maxCount: 8
            },
            {
                name: 'basketballPlayerImage',
                maxCount: 8
            },
            {
                name: 'basketballPlayerCnicImg',
                maxCount: 8
            },
            {
                name: 'badmintonSecondPlayerId',
                maxCount: 1
            },
            {
                name: 'badmintonSecondPlayerImage',
                maxCount: 1
            },
            {
                name: 'badmintonSecondPlayerCnicImage',
                maxCount: 1
            },
            {
                name: 'paymentScreenshot',
                maxCount: 1
            },
        ]
    ); // 'image' is the name of the file input field in your form

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json({
                status: "error",
                message: 'File size exceeds 500KB!'
            });
        } else if (err) {
            if (err === 'INVALID_TYPE') {
                return res.status(400).json({
                    status: 'error',
                    message: "Invalid file type."
                });
            }

            // An unknown error occurred when uploading.
            console.log(err);
            return res.status(500).json({
                status: 'internal-server-error',
                message: "Please try again later."
            });
        }

        // console.log(req.body);
        // console.log(req.files);

        // Everything went fine.
        next();
    });
};


exports.getRegisteredUsers = async (req, res, next)=>{
    try {

        const registeredUsers = await Registration.find();

        if (registeredUsers.length > 0){
            res.locals.registered_users = registeredUsers;
        }

        next();

    } catch (err) {
        console.log(err);
        next('Registration controller error')
    }
}