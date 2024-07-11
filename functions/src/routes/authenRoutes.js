const express = require('express');
const router = express.Router();
const authenController = require('../controllers/authenController');
const { verifyToken, isAdmin, isUser } = require('../middleware/authmiddleware');

// Định tuyến cho đăng nhập
router.post('/signin', authenController.signIn);


// Định tuyến cho kiểm tra vai trò người dùng, chỉ cần xác thực
router.get('/check-role', verifyToken, authenController.checkRole);

// Định tuyến cho thiết lập vai trò người dùng, không yêu cầu xác thực
router.put('/set-role/:email', authenController.setRole);

// Xuất router để sử dụng trong ứng dụng
module.exports = router;
