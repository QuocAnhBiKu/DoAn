const dotenv = require('dotenv');
const path = require('path');
// Load .env từ thư mục gốc của functions
dotenv.config({ path: path.resolve(__dirname, '../../.env')});

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
        conceptMath: "",
        previousConcepts: "",
        rememberCheckQuestionNum: "",
        understandCheckQuestionNum: "",
        applyCheckQuestionNum: "",
        analyzeCheckQuestionNum: "",
        evaluateCheckQuestionNum: "",
        createCheckQuestionNum: "",
        questionTypes: "",
    }) => {
        try {
            const headers = {
                "Authorization": `Bearer ${process.env.KEY_QUIZ_AI}`,
                "Content-Type": "application/json",
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            };
            const body = {
                inputs,
                response_mode: 'streaming',
                user,
            };
            const response = await fetch(`${process.env.BASE_URL_AI}/workflows/run`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let result = '';
            const processStream = async () => {
                const { done, value } = await reader.read();
                if (done) return;
                if (value) {
                    result += decoder.decode(value, { stream: true });
                }
                await processStream();
            };
            await processStream();
            const datas = result.split("\n\n").filter(Boolean); // Filter out any empty strings
            const len = datas.length;
            const jsonResponse = datas[len - 1].replace(/data: /, ""); // Get the last complete JSON chunk
            return JSON.parse(jsonResponse);
        } catch (error) {
            throw new Error(error.message);
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
                "Authorization": `Bearer ${process.env.KEY_SUMMARY_AI}`,
                "Content-Type": "application/json"
            };
            const body = {
                inputs,
                response_mode,
                user,
            };
            const response = await fetch(`${process.env.BASE_URL_AI}/workflows/run`, {
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

    instructionService: async (user, inputs = {
        lessonId: "",
        lessonImage: "",
        lessonTopic: "",
        lessonGoal: "",
        levelDescription: "",
        projectDescription: "",
        projectTools: "",
        previousConcepts: "",
        conceptComputerScience: "",
        conceptScience: "",
        conceptTech: "",
        conceptEngineering: "",
        conceptArt: "",
        concepMath: "",
    }, response_mode = 'blocking') => {
        try {
            const headers = {
                "Authorization": `Bearer ${process.env.KEY_PROJECT_AI}`,
                "Content-Type": "application/json"
            };
            const body = {
                inputs,
                response_mode,
                user,
            };
            const response = await fetch(`${process.env.BASE_URL_AI}/workflows/run`, {
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
