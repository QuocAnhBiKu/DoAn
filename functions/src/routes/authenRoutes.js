const express = require('express');
const router = express.Router();
const authenController = require('../controllers/authenController');
const { verifyToken, isAdmin, isUser } = require('../middleware/authmiddleware');

router.post('/signin', authenController.signIn);
// Route chỉ cho user
router.get('/user-data', verifyToken, isUser, (req, res) => {
    res.json({ message: "User data accessed successfully" });
  });
  
  // Route chỉ cho admin
  router.get('/admin-data', verifyToken, isAdmin, (req, res) => {
    res.json({ message: "Admin data accessed successfully" });
  });
  
  // Route kiểm tra vai trò
  router.get('/check-role/:uid', verifyToken, authenController.checkRole);
  
  // Route thay đổi vai trò (chỉ admin mới có quyền)
  router.put('/set-role/:uid', verifyToken, authenController.setRole);
  

module.exports = router;