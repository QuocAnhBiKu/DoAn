const express = require('express');
const router = express.Router();
const levelsController = require('../controllers/levelController');

// Route để lấy tất cả các cấp độ của một khóa học cụ thể
router.get('/', levelsController.getAllLevelsForCourseController);

// Route để tìm cấp độ bằng ID của một khóa học cụ thể
router.get('/find', levelsController.findLevelByIdController);

// Route để tìm cấp độ bằng tên của một khóa học cụ thể
router.get('/:courseId/name/:levelName', levelsController.findLevelByNameController);

module.exports = router;
