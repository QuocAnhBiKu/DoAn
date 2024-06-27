// Cấu hình Firebase (thay thế bằng cấu hình của bạn)
const firebaseConfig = {
  apiKey: "AIzaSyCuXSbl4DrKN4fStB4B2YWuPgMbGlX7vuE",
  authDomain: "testjsonloop.firebaseapp.com",
  projectId: "testjsonloop",
  storageBucket: "testjsonloop.appspot.com",
  messagingSenderId: "522508231515",
  appId: "1:522508231515:web:9f73d967a3e26966edb07e",
  measurementId: "G-MTBBFPNWW9"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userInfo = document.getElementById('userInfo');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userPhoto = document.getElementById('userPhoto');
const userRole = document.getElementById('userRole');

// Xử lý đăng nhập
signInBtn.onclick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            updateUI(user);
            sendUserToServer(user);
        }).catch((error) => {
            console.error("Error during sign in:", error);
        });
};

// Xử lý đăng xuất
signOutBtn.onclick = () => {
    firebase.auth().signOut().then(() => {
        updateUI(null);
    }).catch((error) => {
        console.error("Error during sign out:", error);
    });
};

// Cập nhật UI
function updateUI(user) {
    if (user) {
        signInBtn.style.display = 'none';
        signOutBtn.style.display = 'block';
        userInfo.style.display = 'block';
        userName.textContent = `Name: ${user.displayName}`;
        userEmail.textContent = `Email: ${user.email}`;
        userPhoto.src = user.photoURL;
        checkUserRole();
    } else {
        signInBtn.style.display = 'block';
        signOutBtn.style.display = 'none';
        userInfo.style.display = 'none';
        localStorage.removeItem('googleToken');
        localStorage.removeItem('userEmail');
    }
}
function sendUserToServer(user) {
    user.getIdToken().then(googleToken => {
        fetch('http://localhost:3000/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                googleUser: {
                    name: user.displayName,
                    email: user.email
                },
                googleToken: googleToken
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            localStorage.setItem('googleToken', data.token);
            checkUserRole(user.email);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}

function checkUserRole() {
    const token = localStorage.getItem('googleToken');
    fetch(`http://localhost:3000/api/auth/check-role`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        userRole.textContent = `Role: ${data.role || 'Not set'}`;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
