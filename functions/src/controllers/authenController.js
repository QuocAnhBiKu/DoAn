const authenService = require('../service/authenService');
const admin = require('firebase-admin');

const signIn = async (req, res) => {
  try {
    const { googleUser, googleToken } = req.body;
    
    if (!googleToken) {
      return res.status(401).json({ error: "No token provided" });
    }
    
    // Verify the token
    try {
      const decodedToken = await admin.auth().verifyIdToken(googleToken);
      
      // Kiểm tra xem email từ token có khớp với email từ googleUser không
      if (decodedToken.email !== googleUser.email) {
        return res.status(401).json({ error: "Email mismatch" });
      }
      
      const user = await authenService.signIn(googleUser);
      res.status(200).json({ user, token: googleToken });
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkRole = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header provided" });
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;
    const role = await authenService.checkRole(email);
    res.status(200).json({ role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setRole = async (req, res) => {
  try {
    const { email } = req.params;
    const { newRole } = req.body;
    await authenService.setRole(email, newRole);
    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signIn, checkRole, setRole };