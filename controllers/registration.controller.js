const Registration = require("../models/registrationModel");


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
        selectedSports.push({
            sport_name : data["Futsal"],
            players : data["FutsalPlayers"]
        })
    }
    
    if (data["Basketball"] && data["BasketballPlayers"]){
        selectedSports.push({
            sport_name : data["Basketball"],
            players : data["BasketballPlayers"]
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