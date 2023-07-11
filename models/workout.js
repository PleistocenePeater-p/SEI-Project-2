const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Athlete Schema
  const athleteSchema = new Schema({
//    userId: String, // this will be injected
    name: {
        type: String
    },
    dob: {
        type: Date,
        default: function() {
            return new Date().getFullYear();
        }}
  });
  
//Workout Schema
const workoutSchema = new mongoose.Schema({
//    userId: String, // this will be injected
    date: {
        type: Number, 
        default: function() {
          return new Date().getFullYear();
      }},
    upper: {
        type: String
    },
    lower: {
        type: String
    },
    conditioning: {
        type: String
    },
    athletes: [athleteSchema]   //embedding (JIM: create separate model, use [])
  });



  module.exports = mongoose.model('Workout', workoutSchema);