// routes/index.js
const express = require('express');
const coursesRoutes = require('./couseRoutes');
const levelsRoutes = require('./levelRoutes');
const lessonsRoutes = require('./lessonRoutes');
const dataRoutes = require('./dataRoutes');
const projects = require('./projectRoutes');
const tool = require('./toolRoutes');

const router = express.Router();

// Sử dụng các routes từ các file routes khác
router.use('/courses', coursesRoutes);
router.use('/levels', levelsRoutes);
router.use('/lessons', lessonsRoutes);
router.use('/getAll',dataRoutes)
router.use('/project',projects)
router.use('/tool',tool)



module.exports = router;
