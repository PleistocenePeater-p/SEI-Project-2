const express = require('express');
const router = express.Router();

const workoutsCtrl = require('../controllers/workouts');

// GET /workouts
router.get('/', workoutsCtrl.index);
// NEW /workouts
router.get('/new', workoutsCtrl.new);
// POST /workouts
router.post('/', workoutsCtrl.create);

module.exports = router;