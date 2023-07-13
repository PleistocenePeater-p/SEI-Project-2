const mongoose = require('mongoose');
const Schema = mongoose.Schema;


  
//Workout Schema
const workoutSchema = new mongoose.Schema({
//    userId: String, // this will be injected
    date: {
        type: Date, 
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
    athletes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Athlete'}],
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  userName: String,
  userAvatar: String
  });



  module.exports = mongoose.model('Workout', workoutSchema);