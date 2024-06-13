// controllers/lessonsController.js
const lessonServie = require('../service/lessonService');

// Lấy danh sách các bài học của một cấp độ trong một khóa học
async function getAllLessonsForLevelController(req, res) {
  const { courseId, levelId } = req.params;
  try {
    const lessons = await lessonServie.getAllLessonsForLevel(courseId, levelId);
    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllLessonsForLevelController,
};
