const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String
  },
  father_name: {
    type: String
  },
  contact_number: {
    type: String
  },
  email: {
    type: String
  },
  cnic: {
    type: String
  },
  is_ims_student: {
    type: String
  },
  institute: {
    type: String
  },
  student_id_no: {
    type: String
  },
  register_as: {
    type: String
  },
  sport_registered_in: [{
    type: Object
  }],
  total_amount: {
    type: Number
  },
  ambassador_name: {
    type: String,
    default : ""
  },
  images_directory: {
    type: String
  }
},
{
  timestamps : true
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;