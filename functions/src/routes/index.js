const express = require('express');
const coursesRoutes = require('./courseRoutes')
const levelsRoutes = require('./levelRoutes');
const lessonsRoutes = require('./lessonRoutes');
const dataRoutes = require('./dataRoutes');
const projectsRoutes = require('./projectRoutes');
const toolsRoutes = require('./toolRoutes');
const materialsRoutes = require("./materialRoutes");
const chatRoutes = require('./chatRoutes');

const router = express.Router();

// Sử dụng các routes từ các file routes khác
// Courses
router.use('/courses', coursesRoutes);
// Levels
router.use('/levels', levelsRoutes);
// Lessons
router.use('/lessons', lessonsRoutes);
// Data
router.use('/getAll', dataRoutes);
// Projects
router.use('/projects', projectsRoutes);
// Tools
router.use('/tools', toolsRoutes);
// Materials
router.use('/materials', materialsRoutes);
// Chat
router.use('/chat', chatRoutes);

module.exports = router;
