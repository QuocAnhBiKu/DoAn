const admin = require('firebase-admin');
const { checkRole } = require('../service/authenService'); // Import hàm checkRole từ authenService

// Khởi tạo ứng dụng Firebase Admin với thông tin từ file cấu hình
const serviceAccount = require('../configs/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware để xác thực token
const verifyToken = async (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" }); // Trả về lỗi nếu không có token
  }

  try {
    // Xác thực token và giải mã để lấy thông tin người dùng
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userEmail = decodedToken.email; // Lưu email người dùng vào req để sử dụng sau
    next(); // Chuyển sang middleware tiếp theo
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" }); // Trả về lỗi nếu token không hợp lệ
  }
};

// Middleware để kiểm tra vai trò Admin
const isAdmin = async (req, res, next) => {
  try {
    // Kiểm tra vai trò của người dùng
    const role = await checkRole(req.userEmail);
    if (role === 'admin') {
      next(); // Nếu là Admin, chuyển sang middleware tiếp theo
    } else {
      res.status(403).json({ message: "Require Admin Role!" }); // Trả về lỗi nếu không phải Admin
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to verify user role!" }); // Trả về lỗi nếu không thể xác thực vai trò
  }
};

// Middleware để kiểm tra vai trò User
const isUser = async (req, res, next) => {
  try {
    // Kiểm tra vai trò của người dùng
    const role = await checkRole(req.userEmail);
    if (role === 'user' || role === 'admin') {
      next(); // Nếu là User hoặc Admin, chuyển sang middleware tiếp theo
    } else {
      res.status(403).json({ message: "Require User Role!" }); // Trả về lỗi nếu không phải User
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to verify user role!" }); // Trả về lỗi nếu không thể xác thực vai trò
  }
};

// Xuất các hàm middleware
module.exports = {
  verifyToken, // Xuất hàm verifyToken
  isAdmin, // Xuất hàm isAdmin
  isUser // Xuất hàm isUser
};
