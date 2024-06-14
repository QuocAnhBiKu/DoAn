const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getAllCourses);
router.get('/id/:courseId', courseController.findByCourseId);
router.get('/name/:courseName', courseController.findByCourseName);

module.exports = router;
