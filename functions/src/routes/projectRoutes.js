const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route lấy tất cả các dự án
router.get('/', projectController.getAllProjects);

// Route tìm dự án bằng tên
router.get('/name/:projectName', projectController.getProjectByName);

// Route tìm dự án bằng ID
router.get('/id/:projectId', projectController.getProjectById);

module.exports = router;
