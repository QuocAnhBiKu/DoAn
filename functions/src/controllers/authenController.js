const authenService = require('../service/authenService');
const admin = require('firebase-admin');

// Hàm signIn: Xử lý đăng nhập bằng tài khoản Google
const signIn = async (req, res) => {
  try {
    const { googleUser, googleToken } = req.body;
    
    // Kiểm tra xem token từ client có tồn tại không
    if (!googleToken) {
      return res.status(401).json({ error: "Không có token được cung cấp" });
    }
    
    // Xác thực token từ Firebase Authentication
    try {
      const decodedToken = await admin.auth().verifyIdToken(googleToken);
      
      // Kiểm tra tính hợp lệ của token và xác nhận email
      if (decodedToken.email !== googleUser.email) {
        return res.status(401).json({ error: "Email không khớp" });
      }
      
      // Gọi service để đăng nhập và trả về thông tin người dùng cùng token
      const user = await authenService.signIn(googleUser);
      res.status(200).json({ user, token: googleToken });
    } catch (error) {
      return res.status(401).json({ error: "Token không hợp lệ" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hàm checkRole: Kiểm tra vai trò của người dùng dựa trên token xác thực
const checkRole = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    // Kiểm tra xem header Authorization có được cung cấp không
    if (!authHeader) {
      return res.status(401).json({ error: "Không có header Authorization được cung cấp" });
    }
    
    // Lấy token từ header và xác thực thông qua Firebase Authentication
    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;
    
    // Gọi service để kiểm tra vai trò của người dùng và trả về kết quả
    const role = await authenService.checkRole(email);
    res.status(200).json({ role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hàm setRole: Thiết lập vai trò mới cho người dùng dựa trên email
const setRole = async (req, res) => {
  try {
    const { email } = req.params;
    const { newRole } = req.body;
    
    // Gọi service để cập nhật vai trò mới cho người dùng
    await authenService.setRole(email, newRole);
    res.status(200).json({ message: 'Cập nhật vai trò thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signIn, checkRole, setRole };
