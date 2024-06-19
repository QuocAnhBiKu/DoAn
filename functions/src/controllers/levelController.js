const levelService = require('../service/levelService');

async function getAllLevelsForCourseController(req, res) {
  const { courseId } = req.query;
  try {
    const levels = await levelService.getAllLevelsForCourseService(courseId);
    res.json(levels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function findLevelByIdController(req, res) {
  const { courseId, levelId } = req.query; // Sử dụng req.query
  try {
    const level = await levelService.findLevelByIdService(courseId, levelId);
    if (!level) {
      res.status(404).json({ message: 'Level not found' });
    } else {
      res.json(level);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function findLevelByNameController(req, res) {
  const { courseId, levelName } = req.params;
  try {
    const level = await levelService.findLevelByNameService(courseId, levelName);
    if (!level) {
      res.status(404).json({ message: 'Level not found' });
    } else {
      res.json(level);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllLevelsForCourseController,
  findLevelByIdController,
  findLevelByNameController,
};