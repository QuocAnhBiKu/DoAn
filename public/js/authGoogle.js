document.getElementById('googleButton').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
});

// Xử lý sau khi trang web được chuyển hướng từ Google về
firebase.auth().getRedirectResult().then((result) => {
  if (result.credential) {
    // Lấy ID token từ kết quả đăng nhập
    const idToken = result.credential.idToken;
    console.log(idToken); // For debugging purposes

    // Lưu token vào localStorage với thời hạn 60 phút
    localStorage.setItem('google_id_token', idToken);
    resetTimeout();

    // Xử lý đăng nhập thành công và ẩn khung đăng nhập
    handleLoginSuccess();
  }
}).catch((error) => {
  console.error('Đăng nhập bằng Google không thành công:', error);
  alert('Đăng nhập bằng Google không thành công.');
});

// Function to handle login success
function handleLoginSuccess() {
  alert('Đăng nhập thành công!'); // Thông báo đăng nhập thành công

  // Lấy thông tin người dùng từ Firebase Auth
  const user = firebase.auth().currentUser;
  if (user) {
    // Lấy URL của avatar từ thông tin người dùng (nếu có)
    const avatarUrl = user.photoURL;
    if (avatarUrl) {
      document.getElementById('userAvatar').src = avatarUrl;
    }

    // Hiển thị nút đăng xuất
    document.getElementById('logoutSection').classList.remove('hidden');
    document.getElementById('logoutButton').addEventListener('click', () => {
      firebase.auth().signOut().then(() => {
        // Xóa token và hiển thị lại form đăng nhập
        localStorage.removeItem('google_id_token');
        showLoginForm();
        alert('Bạn đã đăng xuất thành công.');
      }).catch((error) => {
        console.error('Đăng xuất không thành công:', error);
        alert('Đăng xuất không thành công.');
      });
    });
  }

  // Ẩn khung đăng nhập
  hideLoginForm();

  // Call populateCourses to load the course data
  populateCourses();

  // Add event listeners to reset timeout on user activity
  document.addEventListener('keydown', resetTimeout);
  document.addEventListener('click', resetTimeout);
}

// Function to show login form
function showLoginForm() {
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('main').style.display = 'none'; // Ẩn nội dung chính nếu cần

  // Ẩn avatar và nút đăng xuất khi hiển thị lại form đăng nhập
  document.getElementById('userAvatar').src = '';
  document.getElementById('logoutSection').classList.add('hidden');
}

// Function to hide login form
function hideLoginForm() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('main').style.display = 'block'; // Hiển thị nội dung chính
}

// Function to reset timeout
let timeout;
function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    localStorage.removeItem('google_id_token');
    alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
    showLoginForm();
  }, 60000 * 60); // 60 phút
}

// Check if user is already logged in
window.onload = () => {
  const token = localStorage.getItem('google_id_token');
  if (token) {
    // Verify the token with Firebase to ensure it's still valid
    firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(token))
      .then(() => {
        // Token is valid, consider user as logged in
        handleLoginSuccess();
        resetTimeout();
      })
      .catch(error => {
        console.error('Token verification failed:', error);
        // Token is invalid, clear the localStorage item
        localStorage.removeItem('google_id_token');
        // Show login section
        showLoginForm();
      });
  } else {
    // Token not present, show login section
    showLoginForm();
  }
};
