const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// Route lấy tất cả các tài liệu
router.get('/', materialController.getAllMaterials);

// Route tìm tài liệu bằng ID
router.get('/id/:materialId', materialController.findByMaterialId);

// Route tìm tài liệu bằng tên
router.get('/name/:materialName', materialController.findByMaterialName);

module.exports = router;
