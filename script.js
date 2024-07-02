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
  const fetchQuizBtn = document.getElementById('fetchQuizBtn');
  const quizContainer = document.getElementById('quizContainer');
  
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
          fetchQuizBtn.style.display = 'block';
          userName.textContent = `Name: ${user.displayName}`;
          userEmail.textContent = `Email: ${user.email}`;
          userPhoto.src = user.photoURL;
      } else {
          signInBtn.style.display = 'block';
          signOutBtn.style.display = 'none';
          userInfo.style.display = 'none';
          fetchQuizBtn.style.display = 'none';
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
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      });
  }
  
  function fetchQuizData(user) {
      const requestBody = {
          courseId: "blg",
          levelId: "blg-hp01",
          lessonId: "blg-hp01-b01",
          rememberCheckQuestionNum: 2,
          understandCheckQuestionNum: 3,
          applyCheckQuestionNum: 4,
          analyzeCheckQuestionNum: 8,
          evaluateCheckQuestionNum: 5,
          createCheckQuestionNum: 1,
          questionTypes: ["Multiple Choice"],
          previousConcepts: 1
      };
  
      user.getIdToken().then(token => {
          fetch('http://localhost:3000/api/chat/generateQuiz', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(requestBody),
          })
          .then(response => response.json())
          .then(data => {
              displayQuiz(data);
          })
          .catch((error) => {
              console.error('Error fetching quiz data:', error);
          });
      });
  }
  
  function displayQuiz(quizData) {
      quizContainer.innerHTML = '';
      quizData.forEach(question => {
          const questionElement = document.createElement('div');
          questionElement.classList.add('question');
          questionElement.innerHTML = `
              <p><strong>ID:</strong> ${question.ID}</p>
              <p><strong>Type:</strong> ${question.questionType}</p>
              <p><strong>Difficulty:</strong> ${question.questionDifficulty}</p>
              <p><strong>Question:</strong> ${question.questionText}</p>
              <ul>
                  <li>${question.answer1}</li>
                  <li>${question.answer2}</li>
                  <li>${question.answer3}</li>
              </ul>
              <p><strong>Correct Answer:</strong> ${question.correctAnswer}</p>
          `;
          quizContainer.appendChild(questionElement);
      });
  }
  
  fetchQuizBtn.onclick = () => {
      const user = firebase.auth().currentUser;
      if (user) {
          fetchQuizData(user);
      } else {
          console.error('User not signed in');
      }
  };
  