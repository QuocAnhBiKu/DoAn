const { db } = require('../configs/firebaseConfig');
const { doc, setDoc, getDoc } = require('firebase/firestore');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const signIn = async (googleUser) => {
  try {
    const { uid, email, displayName, photoURL } = googleUser;
    
    // Kiểm tra xem user đã tồn tại chưa
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    let userData;
    
    if (userDoc.exists()) {
      // Nếu user đã tồn tại, lấy dữ liệu hiện có
      userData = userDoc.data();
    } else {
      // Nếu user chưa tồn tại, tạo mới với role mặc định là 'user'
      userData = {
        uid,
        email,
        displayName,
        photoURL,
        role: 'user'
      };
      
      // Lưu thông tin người dùng mới vào Firestore
      await setDoc(doc(db, 'users', uid), userData);
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not set');
    }

    // Tạo JWT token
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { user: userData, token };
  } catch (error) {
    throw error;
  }
};

const checkRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const setRole = async (uid, newRole) => {
  try {
    await setDoc(doc(db, 'users', uid), { role: newRole }, { merge: true });
    return true;
  } catch (error) {
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
};

module.exports = { signIn, checkRole, setRole, verifyToken };