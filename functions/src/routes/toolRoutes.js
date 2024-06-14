const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');

router.get('/', toolController.getAllTools);
router.get('/name/:toolName', toolController.getToolByName);
router.get('/id/:toolId', toolController.getToolById);
module.exports = router;