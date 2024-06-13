// controllers/levelsController.js
const levelService = require('../service/levelService');

// Lấy danh sách các cấp độ của một khóa học cụ thể
async function getAllLevelsForCourseController(req, res) {
  const { courseId } = req.params;
  try {
    const levels = await levelService.getAllLevelsForCourse(courseId);
    res.json(levels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllLevelsForCourseController,
};
