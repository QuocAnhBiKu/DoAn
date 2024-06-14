// controllers/projectController.js

const projectService = require('../service/projectService');

async function getAllProjects(req, res) {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProjectByName(req, res) {
  const { projectName } = req.params; // Ensure projectName is correctly received
  try {
    const projects = await projectService.getProjectByName(projectName);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProjectById(req, res) {
  const { projectId } = req.params; // Ensure projectId is correctly received
  try {
    const project = await projectService.getProjectById(projectId);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
    } else {
      res.json(project);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllProjects,
  getProjectByName,
  getProjectById,
};
