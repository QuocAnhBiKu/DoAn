class Lesson {
  constructor(doc) {
    this.lessonId = doc.id;
    this.lessonName = doc.data().lessonName;
    this.lessonNumber = doc.data().lessonNumber;
    this.lessonImage = doc.data().lessonImage;
    this.lessonTopic = doc.data().lessonTopic;
    this.lessonGoal = doc.data().lessonGoal;
    this.lessonTools = doc.data().lessonTools || [];
    this.lessonConcepts = {
      conceptComputerScience: doc.data().conceptComputerScience || [],
      conceptScience: doc.data().conceptScience || [],
      conceptTech: doc.data().conceptTech || [],
      conceptEngineering: doc.data().conceptEngineering || [],
      conceptArt: doc.data().conceptArt || [],
      conceptMath: doc.data().conceptMath || [],
    };
    this.lessonMaterials = {
      lessonPlanId: doc.data().lessonPlanId,
      slideId: doc.data().slideId,
      summaryId: doc.data().summaryId,
      quizId: doc.data().quizId,
      videoId: doc.data().videoId,
    };
    this.lessonProject = {
      projectId: doc.data().projectId || null,
    };
  }
}

module.exports = Lesson;
