// routes/index.js
const express = require('express');
const coursesRoutes = require('./couseRoutes');
const levelsRoutes = require('./levelRoutes');
const lessonsRoutes = require('./lessonRoutes');
const dataRoutes = require('./dataRoutes');
const projectsRoutes = require('./projectRoutes');
const toolsRoutes = require('./toolRoutes');
const materialsRoutes = require("./materialRoutes")

const router = express.Router();

// Sử dụng các routes từ các file routes khác
//Courses
router.use('/courses', coursesRoutes);

//Levels
router.use('/levels', levelsRoutes);

//Lesson
router.use('/lessons', lessonsRoutes);

//Data
router.use('/getAll',dataRoutes)

//Project
router.use('/projects',projectsRoutes)

//Tool
router.use('/tools',toolsRoutes)

//Material
router.use('/materials', materialsRoutes)


module.exports = router;
