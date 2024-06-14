// service/toolService.js

const toolRepository = require('../repository/toolRepository');

async function getAllTools() {
  return await toolRepository.getAllTools();
}

async function getToolByName(toolName) {
  return await toolRepository.getToolByName(toolName);
}

async function getToolById(toolId) {
  return await toolRepository.getToolById(toolId);
}

module.exports = {
  getAllTools,
  getToolByName,
  getToolById,
};
