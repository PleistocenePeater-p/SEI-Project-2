const WorkoutModel = require("../models/workout");
const AthleteModel = require("../models/athlete");

module.exports = {
  //    index,
  new: newAthlete,
  create,
  addToWorkout,
  delete: deleteFromWorkout
};

async function deleteFromWorkout(req, res, next) {
  try {
    // Find the movie with the review, 
    const workout_fromDb = await WorkoutModel.findOne({ 'athletes._id': req.params.id, 'athletes.user': req.user._id });
    // A rogue User, a user thats not logged in
    if (!workout_fromDb) return res.redirect('/workouts')
    // then remove the review from the movies movie.reviews array (.remove is from mongoose doc methods)
    workout_fromDb.athletes.remove(req.params.id); // remove takes the id of the subdoc (review)	
    // we mutated the movieDoc reviews array so we need to tell mongodb to update the databsase
    await workout_fromDb.save();
    res.redirect(`/workouts${workout_fromDb._id}`); // tells th client to make a request to this route
  } catch (err) {
    next(err)
  }
}

async function addToWorkout(req, res) {
  try {
    const workoutFromTheDatabase = await WorkoutModel.findById(req.params.id)
    //      console.log(workoutFromTheDatabase, req.body.athleteId)
    workoutFromTheDatabase.athletes.push(req.body.athleteId)
    //      console.log("something hee hee")
    await workoutFromTheDatabase.save()
    res.redirect(`/workouts/${req.params.id}`)
  } catch (err) {
    res.send(err)
  }
}

async function newAthlete(req, res) {
  try {
    const allAthletes = await AthleteModel.find({});
    res.render("athletes/new", {
      title: "Add Athlete",
      athletes: allAthletes,
    });
  } catch (err) {
    res.send(err);
  }
}

async function create(req, res) {
  //const a = req.body.dob //reformat?
  try {
    /// Athlete.create is our model using the create method 
    // to take the contents of the form (req.body), and go all the 
    // way to mongodb atlas, to create a new document in the athletes
    // collection

    // createdAthlete is the variable that holds the result 
    // of Athlete.create which is the document you created in the 
    // database
    const createdAthlete = await AthleteModel.create(req.body);
    console.log(createdAthlete, " <- createdAthlete")
    // tell the client to make a GET request to /athletes/new
    res.redirect("/athletes/new");
  } catch (err) {
    // if there is an error send back the object 
    res.send(err);
  }
}