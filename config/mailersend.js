// require('dotenv').config();
// const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

// // Initialize MailerSend
// const mailerSend = new MailerSend({
//     apiKey: process.env.MAILERSEND_API_KEY,
// });

// // Function to send registration email using custom template
// async function sendRegistrationEmail(userEmail) {
//     try {
//         const sentFrom = new Sender("info@imolympiad.com", "IMOlympiad Team");
//         const recipients = [new Recipient(userEmail, "Your Client")];
        
//         // Replace TEMPLATE_ID with your actual template ID from MailerSend
//         const TEMPLATE_ID = "YOUR_TEMPLATE_ID_HERE";

//         const emailParams = new EmailParams()
//             .setFrom(sentFrom)
//             .setTo(recipients)
//             .setReplyTo(sentFrom)
//             .setSubject("Thank you for registering")
//             .setTemplateId(TEMPLATE_ID);

//         await mailerSend.email.send(emailParams);
//     } catch (error) {
//         console.error("Error sending registration email:", error);
//         // Handle error accordingly
//     }
// }

// module.exports = { sendRegistrationEmail };
