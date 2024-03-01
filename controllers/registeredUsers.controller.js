const Registration = require("../models/registrationModel");
const path = require('path')
const fs = require('fs')

exports.getRegisteredUserDetail = async (req, res, next)=>{
    
    let registeredUserDetail = undefined;
    
    try {

        registeredUserDetail = await Registration.findOne({_id : req.params.user_id});

        if (registeredUserDetail != null){
            res.locals.personal_details = {
                name : registeredUserDetail.name,
                father_name : registeredUserDetail.father_name,
                contact_number : registeredUserDetail.contact_number,
                email : registeredUserDetail.email,
                cnic : registeredUserDetail.cnic,
                is_ims_student : registeredUserDetail.is_ims_student,
            };
            
            res.locals.event_details = {
                register_as : registeredUserDetail.register_as,
                total_amount : registeredUserDetail.total_amount,
                ambassador_name : registeredUserDetail.ambassador_name,
            }

            organizeEventDetails();
            imageLinksSetup();
        
        } else {
            res.locals.personal_details = undefined;
            res.locals.event_details = undefined;
        }

        console.log(res.locals.event_details);

        next();

    } catch (err) {
        console.log(err);
        next('Registration controller error')
    }

    function imageLinksSetup(){
        const imagesPaths = registeredUserDetail['images_paths'];

        for (let image of Object.keys(imagesPaths)){
            
            for (let imageName in imagesPaths[image]) {
                
                // for personal details                
                if (imageName =='studentIdImage' || imageName =='studentImage' || imageName =='cnicImage'){
                    // console.log(imagePaths[image][imageName]);
                    res.locals.personal_details[imageName] = imagesPaths[image][imageName][0]['path'].replace(/\\/g, '/');//replace '\\' with '/' (gives issues in F-E)
                    continue;
                }

                //for event details
                let imagePaths = imagesPaths[image][imageName]
                for (let i = 0; i < imagePaths.length; i++){
                    if(imageName=='paymentScreenshot' || imageName=='badmintonSecondPlayerId' || imageName=='badmintonSecondPlayerImage' || imageName=='badmintonSecondPlayerCnicImage'){
                        res.locals.event_details[imageName] = imagePaths[i]['path'].replace(/\\/g, '/');
                    
                    } else {
                        res.locals.event_details[imageName+(i+1)] = imagePaths[i]['path'].replace(/\\/g, '/');

                    }
                }
            }
        }
    }
    
    function organizeEventDetails(){
        let sportNames = []
        for (let sport of registeredUserDetail.sport_registered_in){
            sportNames.push(sport['sport_name'])
            // console.log(sport);
            res.locals.event_details[sport['sport_name']] = sport;
        }
        res.locals.event_details.selected_sports = sportNames
    }
}

exports.getImage = async (req, res, next) => {
    
    try {

        let imageFolder = req.params.folder + '/' + req.params.sub_folder;
        let imageName = req.params.image_name;
        let imagePath = path.resolve(imageFolder, imageName)
        
        fs.access(imagePath, fs.F_OK, (err) => {
            if (err) {
              console.error(err)
              return res.end();
            }
          
            //file exists
            res.sendFile(imagePath);
        })

    } catch (err) {
        console.log(err);
        res.end();
    }
};

