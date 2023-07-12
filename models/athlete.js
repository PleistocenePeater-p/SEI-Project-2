const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const athleteSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  dob: Date
});

module.exports = mongoose.model('Athlete', athleteSchema);