const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAllProjects);
router.get('/name/:projectName', projectController.getProjectByName);
router.get('/id/:projectId', projectController.getProjectById);

module.exports = router;