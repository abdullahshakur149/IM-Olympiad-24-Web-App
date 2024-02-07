const Registration = require("../models/registrationModel");


exports.registerNewUser = async (req, res, next) => {
    
    try {
        
        let registrationDetails = req.body;
        
        //first update email to lower case
        registrationDetails.email = String(registrationDetails.email).toLowerCase();

        //compulsory inputs are filled?
        for (let key in registrationDetails){
            if (registrationDetails[key] == ''){
                return res.json({
                    'status' : 'error',
                    'message' : 'All fields must be filled.'
                });
            }
        }

        //email already exists?
        // const userEmail = await Registration.findOne({email : registrationDetails.email})
        // if (userEmail != null){
        //     return res.json({
        //         'status' : 'error',
        //         'message' : 'Email already exists.'
        //     });
        // }

        //create registration
        await Registration.create(registrationDetails);
        return res.json({
            'status' : 'success',
            'message' : 'Registration successful.'
        });

    } catch (err) {
        console.log(err);
        next('Registration controller error')
    }
};