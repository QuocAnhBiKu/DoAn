// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCuXSbl4DrKN4fStB4B2YWuPgMbGlX7vuE",
    authDomain: "testjsonloop.firebaseapp.com",
    projectId: "testjsonloop",
    storageBucket: "testjsonloop.appspot.com",
    messagingSenderId: "522508231515",
    appId: "1:522508231515:web:9f73d967a3e26966edb07e",
    measurementId: "G-MTBBFPNWW9"
  };
  firebase.initializeApp(firebaseConfig);
  
  // Xử lý đăng nhập bằng Google
  document.getElementById('googleButton').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const credential = result.credential;
        const user = result.user;
        console.log(user); // For debugging purposes
  
        // Redirect to main page or handle login success
        window.location.href = '/index.html';
      })
      .catch(error => {
        console.error(error);
        alert('Đăng nhập bằng Google không thành công.');
      });
  });
  