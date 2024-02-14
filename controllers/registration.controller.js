const Registration = require("../models/registrationModel");
const multer = require('multer');
const fs = require('fs');


exports.newRegistration = async (req, res, next) => {
    
    try {
        
        let registrationDetails = req.body;

        if (!validatePersonalDetails(registrationDetails)){
            req.flash("response_msg", "Personal details error!")
            return next();
        }
        
        if (!validateEventDetails(registrationDetails)){
            req.flash("response_msg", "Event details error!")
            return next();
        }

        //update email to lower case
        registrationDetails.email = String(registrationDetails.email).toLowerCase();
        
        let dataObj = reformatData(registrationDetails)

        //create registration
        await Registration.create(dataObj);
        req.flash("response_msg", "Success!")
        next();

    } catch (err) {
        console.log(err);
        next('Registration controller error')
    }
};

function validatePersonalDetails(data){
    const itemsToValidate = ["name", "FatherName", "ContactNumber", "email", "cnic"]
    
    //ignore validation for student id if not ims student
    if (data["studentType"] == "yes" && data["studentId"] == ''){
        return false    
    }
    
    //validate all fields are filled
    for (const item of itemsToValidate) {
        if (data[item] == ''){
            return false;
        }
    }
    return true;
}

function validateEventDetails(data){
    const registerAs = ["observer", "participant", "participantAndSocialEvent"]
    const sports = ["Futsal", "Basketball", "Badminton", "TableTennis", "BoardGames", "EGaming", "ParliamentarySummit"]

    //validate register as:
    if (!registerAs.includes(data["RegisterAs"])){
        return false;
    }

    //for observer no need for sports
    if (data["RegisterAs"] == 'observer'){
        return true
    }
    
    //make sure atleast 1 sport is selected
    for (const sport of sports) {
        if (sport in data){
            return true
        }
    }
    return false;
}

function reformatData(data){
    let newData = {
        name : data.name,
        father_name : data.FatherName,
        contact_number : data.ContactNumber,
        email : data.email,
        cnic : data.cnic,
        is_ims_student : data.studentType,
        student_id_no : (function(){
            if (data.studentId) return data.studentId
        }()),
        register_as : data.RegisterAs,
        ambassador_name : data.ambassador
    };

    let selectedSports = []
    if (data["Futsal"] && data["FutsalPlayers"]){
        
        let playersData = []
        for (let i = 1; i <= Number(data["FutsalPlayers"]); i++) {
                playersData.push({
                    ims_student : data[`playerType${i}`],
                    player_name : data[`playerName${i}`],
                    player_father_name : data[`playerFatherName${i}`],
                    player_contact : data[`playerContact${i}`],
                    player_email : data[`playerEmail${i}`],
                    player_cnic : data[`playerCnic${i}`],
                }); 
        }
        selectedSports.push({
            sport_name : data["Futsal"],
            players : data["FutsalPlayers"],
            players_data : playersData
        })
    }
    
    if (data["Basketball"] && data["BasketballPlayers"]){
        let playersData = []
        for (let i = 1; i <= Number(data["BasketballPlayers"]); i++) {
                playersData.push({
                    ims_student : data[`basketballPlayerType${i}`],
                    player_name : data[`basketballPlayerName${i}`],
                    player_father_name : data[`basketballPlayerFatherName${i}`],
                    player_contact : data[`basketballPlayerContact${i}`],
                    player_email : data[`basketballPlayerEmail${i}`],
                    player_cnic : data[`basketballPlayerCnic${i}`],
                }); 
        }

        selectedSports.push({
            sport_name : data["Basketball"],
            players : data["BasketballPlayers"],
            players_data : playersData
        })
    }

    if (data["Badminton"] && data["matchType"]){
        selectedSports.push({
            sport_name : data["Badminton"],
            matchType : data["matchType"]
        })
    }

    if (data["BoardGames"]){
        selectedSports.push({
            sport_name : data["BoardGames"],
            selected_games : (function(){
                let games = [];
                if (data["Ludo"]){
                    games.push(data["Ludo"])
                }
                if (data["Chess"]){
                    games.push(data["Chess"])
                }
                if (data["Carrom"]){
                    games.push(data["Carrom"])
                }
                return games
            }())
        })
    }

    if (data["EGaming"]){
        selectedSports.push({
            sport_name : data["EGaming"],
            selected_games : (function(){
                let games = [];
                if (data["Tekken"]){
                    games.push(data["Tekken"])
                }
                if (data["Fifa"]){
                    games.push(data["Fifa"])
                }
                return games
            }())
        })
    }

    if (data["ParliamentarySummit"]){
        selectedSports.push({
            sport_name : data["ParliamentarySummit"],
            experience : (function(){
                if (data["experience"]){
                    return data["experience"]
                } else {
                    return '0';
                }
            }()),
            leader_of_house : data["LeaderOfHouse"]
        })
    }

    newData.sport_registered_in = selectedSports;
    return newData;
}

//multer
// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync( 'uploads/', { recursive: true })
      cb(null, 'uploads'); // Destination folder for storing uploaded files
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
const uploadFile = function (req, res, fileName) {
      // Multer configuration
    const upload = multer({
        storage: storage,
        limits: { fileSize: 1 * 1024 * 1024 }, // Limiting file size to 1MB
        fileFilter: fileFilter
    }).single(fileName); // 'image' is the name of the file input field in your form

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json({ message: 'File size exceeds 1MB!' });
        } else if (err) {
            if (err === 'INVALID_TYPE'){
                return res.status(400).json({
                  status : 'error',
                  message : "Invalid file type."
                });
              }
        
              // An unknown error occurred when uploading.
              console.log(err);
              return res.status(500).json({
                  status : 'internal-server-error',
                  message : "Please try again later."
              });
        }
        // Everything went fine.
        res.status(200).json({ message: 'File uploaded successfully!' });
    });
};