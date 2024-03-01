const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
  total_views: {
    type: Number
  }
},
{
  timestamps : true
});

const View = mongoose.model('View', viewSchema);

module.exports = View;