// routes/levelsRoutes.js
const express = require('express');
const router = express.Router();
const levelsController = require('../controllers/levelController');

// Route to get all levels for a specific course
router.get('/:courseId', levelsController.getAllLevelsForCourseController);

// Route to get level by ID for a specific course
router.get('/:courseId/id/:levelId', levelsController.findLevelByIdController);

// Route to get level by name for a specific course
router.get('/:courseId/name/:levelName', levelsController.findLevelByNameController);

module.exports = router;
