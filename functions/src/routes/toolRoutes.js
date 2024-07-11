const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');

// Route lấy tất cả các công cụ
router.get('/', toolController.getAllTools);

// Route tìm công cụ bằng tên
router.get('/name/:toolName', toolController.getToolByName);

// Route tìm công cụ bằng ID
router.get('/id/:toolId', toolController.getToolById);

module.exports = router;
