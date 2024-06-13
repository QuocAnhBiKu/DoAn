const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');

router.get('/tools', toolController.getAllTools);

module.exports = router;