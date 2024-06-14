const dataService = require('../service/dataService');

async function getAll(req, res) {
  try {
    const courses = await dataService.getAllData();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getAllById(req, res) {
  try {
    const { courseId, levelId, lessonId } = req.params;
    const data = await dataService.getAllById(courseId, levelId, lessonId);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getAll,
  getAllById
};