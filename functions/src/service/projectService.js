// service/projectService.js

const projectRepository = require('../repository/projectRepository');

async function getAllProjects() {
  return await projectRepository.getAllProjects();
}

async function getProjectByName(projectName) {
  return await projectRepository.getProjectByName(projectName);
}

async function getProjectById(projectId) {
  return await projectRepository.getProjectById(projectId);
}

module.exports = {
  getAllProjects,
  getProjectByName,
  getProjectById,
};
