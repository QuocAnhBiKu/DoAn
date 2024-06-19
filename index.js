// Xử lý đăng nhập bằng Google
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

    // Lưu token vào localStorage với thời hạn 60 giây
    localStorage.setItem('google_id_token', idToken);
    setTimeout(() => {
      localStorage.removeItem('google_id_token');
      alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
      showLoginForm();
    }, 60000*60); // 60 giây

    // Xử lý đăng nhập thành công
    handleLoginSuccess();
  }
}).catch((error) => {
  console.error('Đăng nhập bằng Google không thành công:', error);
  alert('Đăng nhập bằng Google không thành công.');
});

// Function to handle login success
function handleLoginSuccess() {
  alert('Đăng nhập thành công!'); // Thông báo đăng nhập thành công

  // Ẩn khung đăng nhập
  hideLoginForm();

  // Show main content
  document.getElementById('main').style.display = 'block';

  // Call populateCourses to load the course data
  populateCourses();
}

// Function to hide login form
function hideLoginForm() {
  document.getElementById('loginSection').style.display = 'none';
}

// Function to show login form
function showLoginForm() {
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('main').style.display = 'none';
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

// Endpoint API
const APIMain = "http://localhost:3000/api"
const coursesEndpoint = `${APIMain}/courses`;
const levelsEndpoint = `${APIMain}/levels/`;
const lessonsEndpoint = `${APIMain}/lessons/`;

// Function to fetch courses from the API
async function fetchCourses() {
  try {
    const response = await fetch(coursesEndpoint);
    const courses = await response.json();
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// Function to fetch levels from the API
async function fetchLevels(courseId) {
  try {
    const response = await fetch(`${levelsEndpoint}${courseId}`);
    const levels = await response.json();
    return levels;
  } catch (error) {
    console.error("Error fetching levels:", error);
    return [];
  }
}

// Function to fetch lessons from the API
async function fetchLessons(courseId, levelId) {
  try {
    const response = await fetch(`${lessonsEndpoint}${courseId}/${levelId}`);
    const lessons = await response.json();
    return lessons;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
}

// Function to fetch course info from the API
async function fetchCourseInfo(courseId) {
  try {
    const response = await fetch(`${coursesEndpoint}/id/${courseId}`);
    const courseInfo = await response.json();
    return courseInfo;
  } catch (error) {
    console.error("Error fetching course info:", error);
    return null;
  }
}

// Function to fetch level info from the API
async function fetchLevelInfo(courseId, levelId) {
  try {
    const response = await fetch(`${levelsEndpoint}${courseId}/id/${levelId}`);
    const levelInfo = await response.json();
    return levelInfo;
  } catch (error) {
    console.error("Error fetching level info:", error);
    return null;
  }
}

// Function to fetch lesson info from the API
async function fetchLessonInfo(courseId, levelId, lessonId) {
  try {
    const response = await fetch(`${lessonsEndpoint}${courseId}/${levelId}/id/${lessonId}`);
    const lessonInfo = await response.json();
    return lessonInfo;
  } catch (error) {
    console.error("Error fetching lesson info:", error);
    return null;
  }
}

// Function to fetch all necessary data for a given courseId, levelId, lessonId
async function fetchData(courseId, levelId, lessonId) {
  try {
    const [courseInfo, levels, lessons, levelInfo, lessonInfo] = await Promise.all([
      fetchCourseInfo(courseId),
      fetchLevels(courseId),
      fetchLessons(courseId, levelId),
      fetchLevelInfo(courseId, levelId),
      fetchLessonInfo(courseId, levelId, lessonId)
    ]);

    return {
      courseInfo,
      levels,
      lessons,
      levelInfo,
      lessonInfo
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function updateCourseInfo(courseId) {
  try {
    const { courseInfo, levels } = await fetchData(courseId);
    if (courseInfo) {
      const courseInfoContainer = document.getElementById("courseInfoContainer");
      courseInfoContainer.innerHTML = `
        <h2>${checkValue(courseInfo.courseName)}</h2>
        <p><strong>Course Description:</strong> ${checkValue(courseInfo.courseDescription)}</p>
        <p><strong>Course Tools:</strong></p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid black; padding: 8px;">Name</th>
              <th style="border: 1px solid black; padding: 8px;">Description</th>
              <th style="border: 1px solid black; padding: 8px;">Version</th>
              <th style="border: 1px solid black; padding: 8px;">Types</th>
            </tr>
          </thead>
          <tbody>
            ${courseInfo.courseTools.map(tool => `
              <tr>
                <td style="border: 1px solid black; padding: 8px;">${checkValue(tool.toolName)}</td>
                <td style="border: 1px solid black; padding: 8px;">${checkValue(tool.toolDescription)}</td>
                <td style="border: 1px solid black; padding: 8px;">${checkValue(tool.toolVersion)}</td>
                <td style="border: 1px solid black; padding: 8px;">${checkValue(tool.toolTypes)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p><strong>Course Levels:</strong></p>
        <ul>${levels.map(level => `<li>${checkValue(level.levelName)}</li>`).join('')}</ul>
      `;
    } else {
      console.error("Failed to update course info: courseInfo is null or undefined");
    }
  } catch (error) {
    console.error("Failed to update course info:", error);
  }
}

async function updateLevelInfo(courseId, levelId) {
  try {
    const { levelInfo, lessons } = await fetchData(courseId, levelId);
    if (levelInfo) {
      const levelInfoContainer = document.getElementById("levelInfoContainer");
      levelInfoContainer.innerHTML = `
        <h2>${checkValue(levelInfo.levelName)}</h2>
        <p><strong>Level Description:</strong> ${checkValue(levelInfo.levelDescription)}</p>
        <p><strong>Level Tools:</strong></p>
        <ul>${levelInfo.levelTools.map(tool => `<li>${checkValue(tool.toolName)}</li>`).join('')}</ul>
        <p><strong>Level Lessons:</strong></p>
        <ul>${lessons.map(lesson => `<li>${checkValue(lesson.lessonName)}</li>`).join('')}</ul>
      `;
    } else {
      console.error("Failed to update level info: levelInfo is null or undefined");
    }
  } catch (error) {
    console.error("Failed to update level info:", error);
  }
}

async function updateLessonInfo(courseId, levelId, lessonId) {
  try {
    const { lessonInfo } = await fetchData(courseId, levelId, lessonId);
    if (lessonInfo) {
      const lessonInfoContainer = document.getElementById("lessonInfoContainer");

      lessonInfoContainer.innerHTML = `
        <h2>${checkValue(lessonInfo.lessonName)}</h2>
        <p><strong>Lesson Number:</strong> ${checkValue(lessonInfo.lessonNumber)}</p>
        <p><strong>Lesson Image:</strong></p>
        <p><a href="${checkValue(lessonInfo.lessonImage)}" target="_blank" style="color: black;">${checkValue(lessonInfo.lessonImage)}</a></p>
        <p><strong>Lesson Topic:</strong> ${checkValue(lessonInfo.lessonTopic)}</p>
        <p><strong>Lesson Goal:</strong> ${checkValue(lessonInfo.lessonGoal)}</p>
        <p><strong>Lesson Tools:</strong> ${lessonInfo.lessonTools.map(checkValue).join(', ')}</p>
        <p><strong>Concepts:</strong></p>
        <ul>
          <li><strong>Computer Science:</strong> ${lessonInfo.lessonConcepts.conceptComputerScience.map(checkValue).join(', ')}</li>
          <li><strong>Science:</strong> ${lessonInfo.lessonConcepts.conceptScience.map(checkValue).join(', ')}</li>
          <li><strong>Tech:</strong> ${lessonInfo.lessonConcepts.conceptTech.map(checkValue).join(', ')}</li>
          <li><strong>Engineering:</strong> ${lessonInfo.lessonConcepts.conceptEngineering.map(checkValue).join(', ')}</li>
          <li><strong>Art:</strong> ${      lessonInfo.lessonConcepts.conceptArt.map(checkValue).join(', ')}</li>
          <li><strong>Math:</strong> ${lessonInfo.lessonConcepts.conceptMath.map(checkValue).join(', ')}</li>
          <li><strong>Skill:</strong> ${lessonInfo.lessonConcepts.conceptSkill.map(checkValue).join(', ')}</li>
        </ul>
        <p><strong>Materials:</strong></p>
        <ul>
          <li><strong>Lesson Plan:</strong> <a href="${checkValue(lessonInfo.materials.lessonPlan?.materialLink)}" target="_blank" style="color: black;">${checkValue(lessonInfo.materials.lessonPlan?.materialName)}</a></li>
          <li><strong>Slide:</strong> <a href="${checkValue(lessonInfo.materials.slide?.materialLink)}" target="_blank" style="color: black;">${checkValue(lessonInfo.materials.slide?.materialName)}</a></li>
          <li><strong>Summary:</strong> <a href="${checkValue(lessonInfo.materials.summary?.materialLink)}" target="_blank" style="color: black;">${checkValue(lessonInfo.materials.summary?.materialName)}</a></li>
          <li><strong>Quiz:</strong> <a href="${checkValue(lessonInfo.materials.quiz?.materialLink)}" target="_blank" style="color: black;">${checkValue(lessonInfo.materials.quiz?.materialName)}</a></li>
          <li><strong>Video:</strong> <a href="${checkValue(lessonInfo.materials.video?.materialLink)}" target="_blank" style="color: black;">${checkValue(lessonInfo.materials.video?.materialName)}</a></li>
        </ul>
        <p><strong>Project:</strong></p>
        <ul>
          <li><strong>Project Name:</strong> ${checkValue(lessonInfo.project.projectName)}</li>
          <li><strong>Project Description:</strong> ${checkValue(lessonInfo.project.projectDescription)}</li>
          <li><strong>Project Related Concepts:</strong> ${lessonInfo.project.projectRelatedConcepts.map(checkValue).join(', ')}</li>
          <li><strong>Project Tools:</strong> ${lessonInfo.project.projectTools.map(checkValue).join(', ')}</li>
          <li><strong>Project Instruction:</strong> <a href="${checkValue(lessonInfo.project.projectInstruction)}" target="_blank" style="color: black;">${checkValue(lessonInfo.project.projectInstruction)}</a></li>
        </ul>
      `;
    } else {
      console.error("Failed to update lesson info: lessonInfo is null or undefined");
    }
  } catch (error) {
    console.error("Failed to update lesson info:", error);
  }
}

// Function to populate course dropdown
async function populateCourses() {
  try {
    const courses = await fetchCourses();
    const courseSelect = document.getElementById("course");
    courseSelect.innerHTML = '<option value="" disabled selected>Select Course</option>';
    courses.forEach(course => {
      const option = document.createElement("option");
      option.value = course.courseId;
      option.text = course.courseName;
      courseSelect.add(option);
    });
  } catch (error) {
    console.error("Error populating courses:", error);
  }
}

// Function to populate level dropdown
async function populateLevels(courseId) {
  try {
    const levels = await fetchLevels(courseId);
    const levelSelect = document.getElementById("level");
    levelSelect.innerHTML = '<option value="" disabled selected>Select Level</option>';
    levels.forEach(level => {
      const option = document.createElement("option");
      option.value = level.levelId;
      option.text = level.levelName;
      levelSelect.add(option);
    });
  } catch (error) {
    console.error("Error populating levels:", error);
  }
}

// Function to populate lesson dropdown
async function populateLessons(courseId, levelId) {
  try {
    const lessons = await fetchLessons(courseId, levelId);
    const lessonSelect = document.getElementById("lessonName");
    lessonSelect.innerHTML = '<option value="" disabled selected>Select Lesson</option>';
    lessons.forEach(lesson => {
      const option = document.createElement("option");
      option.value = lesson.lessonId;
      option.text = lesson.lessonName;
      lessonSelect.add(option);
    });
  } catch (error) {
    console.error("Error populating lessons:", error);
  }
}

// Function to handle Course change
async function handleCourseChange() {
  const selectedCourseId = document.getElementById("course").value;
  const levelSelect = document.getElementById("level");
  const lessonSelect = document.getElementById("lessonName");
  const levelInfoButton = document.getElementById("levelInfoButton");
  const lessonInfoButton = document.getElementById("lessonInfoButton");

  // Reset level and lesson selection and buttons
  levelSelect.disabled = true;
  lessonSelect.disabled = true;
  levelSelect.innerHTML = '<option value="" disabled selected>Select Level</option>';
  lessonSelect.innerHTML = '<option value="" disabled selected>Select Lesson</option>';
  levelInfoButton.classList.remove("active");
  lessonInfoButton.classList.remove("active");

  if (selectedCourseId) {
    levelSelect.disabled = false;
    await populateLevels(selectedCourseId);
    courseInfoButton.classList.add("active");
  } else {
    courseInfoButton.classList.remove("active");
  }
}

// Function to handle Level change
async function handleLevelChange() {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  const lessonSelect = document.getElementById("lessonName");
  const lessonInfoButton = document.getElementById("lessonInfoButton");

  // Reset lesson selection and button
  lessonSelect.disabled = true;
  lessonSelect.innerHTML = '<option value="" disabled selected>Select Lesson</option>';
  lessonInfoButton.classList.remove("active");

  if (selectedLevelId) {
    lessonSelect.disabled = false;
    await populateLessons(selectedCourseId, selectedLevelId);
    levelInfoButton.classList.add("active");
  } else {
    levelInfoButton.classList.remove("active");
  }
}

// Function to handle Lesson change
async function handleLessonChange() {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  const selectedLessonId = document.getElementById("lessonName").value;
  const lessonInfoButton = document.getElementById("lessonInfoButton");

  if (selectedLessonId) {
    lessonInfoButton.classList.add("active");
  } else {
    lessonInfoButton.classList.remove("active");
  }
}

// Helper function to check for empty, placeholder strings, or undefined values
function checkValue(value) {
  if (value === "" || value === "--- o ---" || value === undefined || value === null) {
    return "Not Available";
  }
  return value;
}

// Event listener for Course Info button
document.getElementById("courseInfoButton").addEventListener("click", async () => {
  const selectedCourseId = document.getElementById("course").value;
  if (selectedCourseId) {
    await updateCourseInfo(selectedCourseId);
  }
});

// Event listener for Level Info button
document.getElementById("levelInfoButton").addEventListener("click", async () => {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  if (selectedCourseId && selectedLevelId) {
    await updateLevelInfo(selectedCourseId, selectedLevelId);
  }
});

// Event listener for Lesson Info button
document.getElementById("lessonInfoButton").addEventListener("click", async () => {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  const selectedLessonId = document.getElementById("lessonName").value;
  if (selectedCourseId && selectedLevelId && selectedLessonId) {
    await updateLessonInfo(selectedCourseId, selectedLevelId, selectedLessonId);
  }
});

// Call populateCourses on page load
window.onload = () => {
  populateCourses();
};

// Function to show Course Info
async function showCourseInfo() {
  const selectedCourseId = document.getElementById("course").value;
  if (selectedCourseId) {
    document.querySelector(".right-column").style.display = "block";
    document.getElementById("courseInfo").style.display = "block";
    document.getElementById("levelInfo").style.display = "none";
    document.getElementById("lessonInfo").style.display = "none";
    updateCourseInfo(selectedCourseId); // Fetch and display course info
}
}

// Function to show Level Info
async function showLevelInfo() {
  const selectedCourseId = document.getElementById("course").value; // Added this line
  const selectedLevelId = document.getElementById("level").value;
  if (selectedLevelId) {
    document.querySelector(".right-column").style.display = "block";
    document.getElementById("levelInfo").style.display = "block";
    document.getElementById("courseInfo").style.display = "none";
    document.getElementById("lessonInfo").style.display = "none";
    updateLevelInfo(selectedCourseId, selectedLevelId); // Fetch and display level info
  }
}

// Function to show Lesson Info
async function showLessonInfo() {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  const selectedLessonId = document.getElementById("lessonName").value;
  if (selectedLessonId) {
    document.querySelector(".right-column").style.display = "block";
    document.getElementById("lessonInfo").style.display = "block";
    document.getElementById("courseInfo").style.display = "none";
    document.getElementById("levelInfo").style.display = "none";
    updateLessonInfo(selectedCourseId, selectedLevelId, selectedLessonId); // Fetch and display lesson info
  }
}

// Event listeners for dropdown changes
document.getElementById("course").addEventListener("change", handleCourseChange);
document.getElementById("level").addEventListener("change", handleLevelChange);
document.getElementById("lessonName").addEventListener("change", handleLessonChange);

// Function to show/hide sections based on selected create type
document.getElementById("createType").addEventListener("change", function() {
var selectedValue = this.value;
var sections = document.querySelectorAll(".hidden");
sections.forEach(section => section.style.display = "none");
if (selectedValue === "concept") {
  document.getElementById("conceptSection").style.display = "block";
  showGenerateButton("conceptSection");
} else if (selectedValue === "project") {
  document.getElementById("projectSection").style.display = "block";
  showGenerateButton("projectSection");
} else if (selectedValue === "quiz") {
  document.getElementById("quizSection").style.display = "block";
  showGenerateButton("quizSection");
} else if (selectedValue === "activity") {
  document.getElementById("activitySection").style.display = "block";
  showGenerateButton("activitySection");
}
});

// Function to show/hide generate button
function showGenerateButton(sectionId) {
document.getElementById(sectionId).querySelector("button").style.display = "block";
}