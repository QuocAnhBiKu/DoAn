const { db } = require('../configs/firebaseConfig');
const { doc, setDoc, getDoc } = require('firebase/firestore');

// Hàm signIn dùng để đăng nhập người dùng bằng tài khoản Google
const signIn = async (googleUser) => {
  try {
    const { email, name } = googleUser;
    
    // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
    const userDoc = await getDoc(doc(db, 'users', email));
    
    let userData;
    
    if (userDoc.exists()) {
      // Nếu người dùng đã tồn tại, lấy thông tin người dùng từ cơ sở dữ liệu
      userData = userDoc.data();
    } else {
      // Nếu người dùng chưa tồn tại, tạo thông tin người dùng mới
      userData = {
        name,
        email,
        role: 'user'
      };
      
      // Lưu thông tin người dùng mới vào cơ sở dữ liệu
      await setDoc(doc(db, 'users', email), userData);
    }

    return userData;
  } catch (error) {
    throw error;
  }
};

// Hàm checkRole dùng để kiểm tra vai trò của người dùng dựa trên email
const checkRole = async (email) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', email));
    if (userDoc.exists()) {
      // Trả về vai trò của người dùng nếu tồn tại
      return userDoc.data().role;
    }
    // Trả về null nếu người dùng không tồn tại
    return null;
  } catch (error) {
    throw error;
  }
};

// Hàm setRole dùng để thiết lập vai trò mới cho người dùng dựa trên email
const setRole = async (email, newRole) => {
  try {
    // Cập nhật vai trò mới cho người dùng và giữ lại các thông tin cũ
    await setDoc(doc(db, 'users', email), { role: newRole }, { merge: true });
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { signIn, checkRole, setRole };
