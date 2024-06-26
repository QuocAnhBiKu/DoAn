let lastFetchedLesson = null;

function setLastFetchedLesson(lesson) {
  lastFetchedLesson = lesson;
}

function getGlossary() {
  if (lastFetchedLesson) {
    return {
      lessonId: lastFetchedLesson.lessonId,
      conceptComputerScience: lastFetchedLesson.lessonConcepts.conceptComputerScience,
      conceptScience: lastFetchedLesson.lessonConcepts.conceptScience,
      conceptTech: lastFetchedLesson.lessonConcepts.conceptTech,
      conceptEngineering: lastFetchedLesson.lessonConcepts.conceptEngineering,
      conceptArt: lastFetchedLesson.lessonConcepts.conceptArt,
      conceptMath: lastFetchedLesson.lessonConcepts.conceptMath,
    };
  } else {
    return null;
  }
}

module.exports = {
  setLastFetchedLesson,
  getGlossary,
};
