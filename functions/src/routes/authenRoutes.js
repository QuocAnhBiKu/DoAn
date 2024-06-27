const express = require('express');
const router = express.Router();
const authenController = require('../controllers/authenController');
const { verifyToken, isAdmin, isUser } = require('../middleware/authmiddleware');

router.post('/signin', authenController.signIn);

router.get('/user-data', verifyToken, isUser, (req, res) => {
    res.json({ message: "User data accessed successfully" });
});
  
router.get('/admin-data', verifyToken, isAdmin, (req, res) => {
    res.json({ message: "Admin data accessed successfully" });
});
  
router.get('/check-role', verifyToken, authenController.checkRole);
  
router.put('/set-role/:email',authenController.setRole);

module.exports = router;