const express = require('express');
const coursesRoutes = require('./courseRoutes');
const levelsRoutes = require('./levelRoutes');
const lessonsRoutes = require('./lessonRoutes');
const dataRoutes = require('./dataRoutes');
const projectsRoutes = require('./projectRoutes');
const toolsRoutes = require('./toolRoutes');
const materialsRoutes = require("./materialRoutes");
const chatRoutes = require('./chatRoutes');
const authenRoutes = require('./authenRoutes');
const router = express.Router();

// Sử dụng các routes từ các file routes khác
// Định tuyến cho Courses
router.use('/courses', coursesRoutes);
// Định tuyến cho Levels
router.use('/levels', levelsRoutes);
// Định tuyến cho Lessons
router.use('/lessons', lessonsRoutes);
// Định tuyến cho Data
router.use('/getAll', dataRoutes);
// Định tuyến cho Projects
router.use('/projects', projectsRoutes);
// Định tuyến cho Tools
router.use('/tools', toolsRoutes);
// Định tuyến cho Materials
router.use('/materials', materialsRoutes);
// Định tuyến cho Chat
router.use('/chat', chatRoutes);
// Định tuyến cho Authen (Xác thực)
router.use('/auth', authenRoutes);

module.exports = router;
