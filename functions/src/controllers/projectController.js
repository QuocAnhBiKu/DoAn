const projectService = require('../service/projectService');

async function getAllProjects(req, res) {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllProjects,
};