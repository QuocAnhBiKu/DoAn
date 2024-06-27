const { db } = require('../configs/firebaseConfig');
const { doc, setDoc, getDoc } = require('firebase/firestore');

const signIn = async (googleUser) => {
  try {
    const { email, name } = googleUser;
    
    // Kiểm tra xem user đã tồn tại chưa
    const userDoc = await getDoc(doc(db, 'users', email));
    
    let userData;
    
    if (userDoc.exists()) {
      userData = userDoc.data();
    } else {
      userData = {
        name,
        email,
        role: 'user'
      };
      
      await setDoc(doc(db, 'users', email), userData);
    }

    return userData;
  } catch (error) {
    throw error;
  }
};

const checkRole = async (email) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', email));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const setRole = async (email, newRole) => {
  try {
    await setDoc(doc(db, 'users', email), { role: newRole }, { merge: true });
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { signIn, checkRole, setRole };