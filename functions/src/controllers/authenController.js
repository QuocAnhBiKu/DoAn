const authenService = require('../service/authenService');

const signIn = async (req, res) => {
  try {
    const { googleUser } = req.body; // Nhận thông tin người dùng Google từ client
    const { user, token } = await authenService.signIn(googleUser);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkRole = async (req, res) => {
  try {
    const { uid } = req.params;
    const role = await authenService.checkRole(uid);
    res.status(200).json({ role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setRole = async (req, res) => {
  try {
    const { uid } = req.params;
    const { newRole } = req.body;
    await authenService.setRole(uid, newRole);
    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signIn, checkRole, setRole };