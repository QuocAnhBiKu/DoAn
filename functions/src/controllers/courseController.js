const courseService = require('../service/courseService');

async function getAllCourses(req, res) {
  try {
    const courses = await courseService.getAllCoursesData();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllCourses,
};