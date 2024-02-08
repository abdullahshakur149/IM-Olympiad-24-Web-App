const mongoose = require('mongoose');

const userRegistrationSchema = new mongoose.Schema({
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
  institute: {
    type: String
  },
  is_ims_student: {
    type: Boolean,
    default : false
  },
  student_id_no: {
    type: String
  },
  registering_as: {
    type: String,
    enum: ['observer', 'participant', 'participant and socialevents']
  },
  sport_registered_in: {
    type: String
  },
  total_amount: {
    type: Number
  },
  ambassador_name: {
    type: String
  }
},
{
  timestamps : true
});

const UserRegistration = mongoose.model('UserRegistration', userRegistrationSchema);

module.exports = UserRegistration;