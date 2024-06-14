const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

router.get('/', materialController.getAllMaterials);
router.get('/id/:materialId', materialController.findByMaterialId);
router.get('/name/:materialName', materialController.findByMaterialName);

module.exports = router;
