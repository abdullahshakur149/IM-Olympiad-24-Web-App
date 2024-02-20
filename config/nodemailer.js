// "use strict";
// const nodemailer = require("nodemailer");

// // Create a transporter object using SMTP
// const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "abdullahshakur95@gmail.com", // Your email address
//     pass: "nevermindthename21@_", // Your email password or app password
//   },
// });

// // Function to send a registration confirmation email
// async function sendRegistrationEmail(userEmail) {
//   try {
//     // Send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"IMOlympiad Team" <example@gmail.com>',
//       to: userEmail, // Recipient address (user's email)
//       subject: "Registration Confirmation", // Subject line
//       html: "<h1>Thank You for Registering!</h1><p>We appreciate your registration for IMOlympiad. We look forward to seeing you at the event.</p>", // HTML content of the email
//     });

//     console.log("Registration confirmation email sent: %s", info.messageId);
//   } catch (error) {
//     console.error("Error sending registration confirmation email:", error);
//     throw error; // Re-throw the error to handle it in the calling function
//   }
// }

// module.exports = { sendRegistrationEmail };
