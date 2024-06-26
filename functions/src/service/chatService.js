const path = require('path');
const dotenv = require('dotenv');

// Load .env từ thư mục gốc của functions
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const services = {
    quizService: async (user, inputs = {
        lessonId: "",
        lessonImage: "",
        lessonTopic: "",
        lessonGoal: "",
        levelDescription: "",
        projectDescription: "",
        projectTools: "",
        conceptComputerScience: "",
        conceptScience: "",
        conceptTech: "",
        conceptEngineering: "",
        conceptArt: "",
        concepMath: "",
        previousConcepts: "",
        rememberCheckQuestionNum: "",
        understandCheckQuestionNum: "",
        applyCheckQuestionNum: "",
        analyzeCheckQuestionNum: "",
        evaluateCheckQuestionNum: "",
        createCheckQuestionNum: "",
        questionTypes: "",
    }, response_mode = 'blocking') => {
        try {
            const headers = {
                "Authorization": `Bearer ${process.env.KEY_QUIZ_AI}`,
                "Content-Type": "application/json"
            };
            const body = {
                inputs,
                response_mode,
                user,
            };
            const response = await fetch(`${process.env.BASE_URL}/workflows/run`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return { message: error.message }
        }
    },

    glosarryService: async (user, inputs = {
        lessonId: "",
        conceptComputerScience: "",
        conceptScience: "",
        conceptTech: "",
        conceptEngineering: "",
        conceptArt: "",
        concepMath: "",
    }, response_mode = 'blocking') => {
        try {
            const headers = {
                "Authorization": `Bearer ${process.env.KEY_QUIZ_AI}`,
                "Content-Type": "application/json"
            };
            const body = {
                inputs,
                response_mode,
                user,
            };
            const response = await fetch(`${process.env.BASE_URL}/workflows/run`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return { message: error.message }
        }
    }
};

module.exports = services;
