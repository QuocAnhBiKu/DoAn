const levelRepository = require('../repository/levelRepository');

async function getAllLevelsForCourseService(courseId) {
  return await levelRepository.getAllLevelsForCourse(courseId);
}

async function findLevelByIdService(courseId, levelId) {
  return await levelRepository.findLevelById(courseId, levelId);
}

async function findLevelByNameService(courseId, levelName) {
  return await levelRepository.findLevelByName(courseId, levelName);
}

module.exports = {
  getAllLevelsForCourseService,
  findLevelByIdService,
  findLevelByNameService,
};
