const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/', dataController.getAll);
router.get('/courses/:courseId/levels/:levelId/lessons/:lessonId', dataController.getAllById);

module.exports = router;