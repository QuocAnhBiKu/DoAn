const jwt = require('jsonwebtoken');
const { checkRole } = require('../service/authenService');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.uid;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const role = await checkRole(req.userId);
    if (role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: "Require Admin Role!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to verify user role!" });
  }
};

const isUser = async (req, res, next) => {
  try {
    const role = await checkRole(req.userId);
    if (role === 'user' || role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: "Require User Role!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to verify user role!" });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isUser
};