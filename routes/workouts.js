const express = require('express');
const router = express.Router();

const workoutsCtrl = require('../controllers/workouts');

// GET /workouts
router.get('/', workoutsCtrl.index);
// NEW /workouts
router.get('/new', workoutsCtrl.new);
// GET /workouts/:id (show functionality) MUST be below new route
router.get('/:id', workoutsCtrl.show);
// GET /workouts/:id/edit
router.get('/:id/edit', workoutsCtrl.edit)
// POST /workouts
router.post('/', workoutsCtrl.create);
// PUT /workouts/:id


module.exports = router;