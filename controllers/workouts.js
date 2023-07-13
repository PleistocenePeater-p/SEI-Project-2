const WorkoutModel = require("../models/workout");
const AthleteModel = require("../models/athlete");

module.exports = {
    index,
    new: newWorkout,
    create,
    show,
    edit,
    update
    
};

async function update(req, res) {
  try {
    const workout_from_Db = await WorkoutModel.findOneAndUpdate({_id: req.params.id},
      req.body,
      {new:true}
      ); // the await is waiting for the WorkoutModel to go to MongoDB ATLAS (our db) a
    //and put the contents form in the db, and come back to the express server
    // if you want to see what you put in the database on your server
    //console.log(workout_from_Db);
    await workout_from_Db.save();
    // Always redirect after CUDing data
    res.redirect(`/workouts/${workout_from_Db._id}`);
  } catch (err) {
    res.send(err);
  }
}

async function edit(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
    const workout_Db = await WorkoutModel.findById(req.params.id);
    res.render("workouts/edit", {
      workout: workout_Db
    });
  } catch(err) {
    res.send(err);
  }
}

async function show(req, res) {
  try {
    const workoutFromTheDb = await WorkoutModel
    .findById(req.params.id)
    .populate("athletes")
    .exec();
    const athletesFromTheDb = await AthleteModel
    .find({_id: {$nin: workoutFromTheDb.athletes}});
    res.render("workouts/show", {
      title: "Workout Detail",
      workout: workoutFromTheDb,
      athletes: athletesFromTheDb
    });
  } catch (err) {
    res.send(err);
  }
}

async function index(req, res, next) {
  const workouts = await WorkoutModel.find({})
  res.render("workouts/index", {title: "All Workouts", workouts:workouts})
}

function newWorkout(req, res) {
    res.render("workouts/new", { title: "Add Workout", errorMsg: "" });
  }


async function create(req, res) {
// Remove empty properties so that defaults will be applied
for (let key in req.body) {
  if (req.body[key] === "") delete req.body[key];
}
req.body.user = req.user._id;
try {
  const workoutFromTheDatabase = await WorkoutModel.create(req.body); // the await is waiting for the WorkoutModel to go to MongoDB ATLAS (our db) a
  //and put the contents form in the db, and come back to the express server
  // if you want to see what you put in the database on your server
  //console.log(workoutFromTheDatabase);
  // Always redirect after CUDing data

  res.redirect("/workouts");
  //res.redirect(`/workouts/${workoutFromTheDatabase._id}`);
} catch (err) {
  // Typically some sort of validation error
  console.log(err);
  res.render("/workouts", { errorMsg: err.message });
}
}