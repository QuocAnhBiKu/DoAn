const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const firebaseConfig = {
  apiKey: "AIzaSyCuXSbl4DrKN4fStB4B2YWuPgMbGlX7vuE",
  authDomain: "testjsonloop.firebaseapp.com",
  projectId: "testjsonloop",
  storageBucket: "testjsonloop.appspot.com",
  messagingSenderId: "522508231515",
  appId: "1:522508231515:web:9f73d967a3e26966edb07e",
  measurementId: "G-MTBBFPNWW9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };