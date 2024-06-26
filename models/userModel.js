const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_name: {
    type: String
  },
  password: {
    type: String
  }
},
{
  timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User;