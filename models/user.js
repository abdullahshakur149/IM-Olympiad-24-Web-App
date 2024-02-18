const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Plugin Passport-Local Mongoose to add username, hash, and salt field to store the username and hashed password.
userSchema.plugin(passportLocalMongoose);

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
