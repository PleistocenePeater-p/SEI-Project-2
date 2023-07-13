const express = require('express');
const router = express.Router();
const athletesCtrl = require('../controllers/athletes');

router.get('/athletes/new', athletesCtrl.new);
router.post('/athletes', athletesCtrl.create);
router.post('/workouts/:id/athletes', athletesCtrl.addToWorkout);
router.delete('/workouts:id/athletes', athletesCtrl.delete);

module.exports = router;