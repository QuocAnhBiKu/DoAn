const admin = require('firebase-admin');
const { checkRole } = require('../service/authenService');

const serviceAccount = require('../configs/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userEmail = decodedToken.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const role = await checkRole(req.userEmail);
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
    const role = await checkRole(req.userEmail);
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
