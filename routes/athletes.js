const express = require('express');
const router = express.Router();
const athletesCtrl = require('../controllers/athletes');

router.get('/athletes/new', athletesCtrl.new);
router.post('/athletes', athletesCtrl.create);
router.post('/workouts/:id/athletes', athletesCtrl.addToWorkout);

module.exports = router;