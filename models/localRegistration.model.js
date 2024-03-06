const mongoose = require('mongoose');

const localRegistrationSchema = new mongoose.Schema({
  name: {
    type: String
  },
  contact_number: {
    type: String
  },
  cnic: {
    type: String
  },
  is_ims_student: {
    type: String
  },
  ims_card_no: {
    type: String
  },
  register_as: {
    type: String
  }
},
{
  timestamps : true
});

const LocalRegistration = mongoose.model('LocalRegistration', localRegistrationSchema);

module.exports = LocalRegistration;