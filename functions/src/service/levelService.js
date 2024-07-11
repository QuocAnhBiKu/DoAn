const levelRepository = require('../repository/levelRepository');

// Hàm getAllLevelsForCourseService: Lấy danh sách các cấp độ của khóa học dựa trên ID của khóa học
async function getAllLevelsForCourseService(courseId) {
  return await levelRepository.getAllLevelsForCourse(courseId);
}

// Hàm findLevelByIdService: Tìm kiếm thông tin của một cấp độ dựa trên ID của khóa học và ID của cấp độ
async function findLevelByIdService(courseId, levelId) {
  return await levelRepository.findLevelById(courseId, levelId);
}

// Hàm findLevelByNameService: Tìm kiếm thông tin của một cấp độ dựa trên ID của khóa học và tên của cấp độ
async function findLevelByNameService(courseId, levelName) {
  return await levelRepository.findLevelByName(courseId, levelName);
}

module.exports = {
  getAllLevelsForCourseService,
  findLevelByIdService,
  findLevelByNameService,
};
