const dataService = require('../service/dataService');

async function getAll(req, res) {
  try {
    const courses = await dataService.getAllData();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAll,
};