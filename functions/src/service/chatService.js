const dotenv = require('dotenv');
const path = require('path');
// Load .env từ thư mục gốc của functions
dotenv.config({ path: path.resolve(__dirname, '../../.env')});

const services = {
    // Hàm tạo câu hỏi cho bài kiểm tra
    quizService: async (user, inputs = {
        lessonId: "", // ID của bài học
        lessonImage: "", // Đường dẫn ảnh của bài học
        lessonTopic: "", // Chủ đề bài học
        lessonGoal: "", // Mục tiêu bài học
        levelDescription: "", // Mô tả cấp độ
        projectDescription: "", // Mô tả dự án
        projectTools: "", // Công cụ cho dự án
        conceptComputerScience: "", // Khái niệm khoa học máy tính
        conceptScience: "", // Khái niệm khoa học
        conceptTech: "", // Khái niệm công nghệ
        conceptEngineering: "", // Khái niệm kỹ thuật
        conceptArt: "", // Khái niệm nghệ thuật
        conceptMath: "", // Khái niệm toán học
        previousConcepts: "", // Các khái niệm trước đó
        rememberCheckQuestionNum: "", // Số lượng câu hỏi kiểm tra mức độ ghi nhớ
        understandCheckQuestionNum: "", // Số lượng câu hỏi kiểm tra mức độ hiểu
        applyCheckQuestionNum: "", // Số lượng câu hỏi kiểm tra mức độ vận dụng
        analyzeCheckQuestionNum: "", // Số lượng câu hỏi kiểm tra mức độ phân tích
        evaluateCheckQuestionNum: "", // Số lượng câu hỏi kiểm tra mức độ đánh giá
        createCheckQuestionNum: "", // Số lượng câu hỏi kiểm tra mức độ sáng tạo
        questionTypes: "", // Các loại câu hỏi
    }) => {
        try {
            // Tạo headers cho request
            const headers = {
                "Authorization": `Bearer ${process.env.KEY_QUIZ_AI}`, // Key truy cập API tạo câu hỏi
                "Content-Type": "application/json",
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            };
            // Tạo body cho request
            const body = {
                inputs, // Dữ liệu đầu vào cho việc tạo câu hỏi
                response_mode: 'streaming', // Chế độ phản hồi streaming
                user, // Thông tin người dùng
            };
            // Gửi request đến API tạo câu hỏi
            const response = await fetch(`${process.env.BASE_URL_AI}/workflows/run`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            // Kiểm tra response có thành công không
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Đọc dữ liệu phản hồi dưới dạng stream
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
            // Xử lý dữ liệu phản hồi và trả về kết quả
            const datas = result.split("\n\n").filter(Boolean); // Filter out any empty strings
            const len = datas.length;
            const jsonResponse = datas[len - 1].replace(/data: /, ""); // Get the last complete JSON chunk
            return JSON.parse(jsonResponse);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Hàm tạo glossary (bảng chú giải thuật ngữ)
    glosarryService: async (user, inputs = {
        lessonId: "", // ID bài học
        conceptComputerScience: "", // Khái niệm khoa học máy tính
        conceptScience: "", // Khái niệm khoa học
        conceptTech: "", // Khái niệm công nghệ
        conceptEngineering: "", // Khái niệm kỹ thuật
        conceptArt: "", // Khái niệm nghệ thuật
        concepMath: "", // Khái niệm toán học
    }, response_mode = 'blocking') => {
        try {
            // Tạo headers cho request
            const headers = {
                "Authorization": `Bearer ${process.env.KEY_SUMMARY_AI}`, // Key truy cập API tạo glossary
                "Content-Type": "application/json"
            };
            // Tạo body cho request
            const body = {
                inputs, // Dữ liệu đầu vào cho việc tạo glossary
                response_mode, // Chế độ phản hồi (blocking/streaming)
                user, // Thông tin người dùng
            };
            // Gửi request đến API tạo glossary
            const response = await fetch(`${process.env.BASE_URL_AI}/workflows/run`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            // Lấy dữ liệu phản hồi và trả về kết quả
            const data = await response.json();
            return data;
        } catch (error) {
            return { message: error.message }
        }
    },

    // Hàm tạo hướng dẫn cho dự án
    instructionService: async (user, inputs = {
        lessonId: "", // ID bài học
        lessonImage: "", // Đường dẫn ảnh của bài học
        lessonTopic: "", // Chủ đề bài học
        lessonGoal: "", // Mục tiêu bài học
        levelDescription: "", // Mô tả cấp độ
        projectDescription: "", // Mô tả dự án
        projectTools: "", // Công cụ cho dự án
        previousConcepts: "", // Các khái niệm trước đó
        conceptComputerScience: "", // Khái niệm khoa học máy tính
        conceptScience: "", // Khái niệm khoa học
        conceptTech: "", // Khái niệm công nghệ
        conceptEngineering: "", // Khái niệm kỹ thuật
        conceptArt: "", // Khái niệm nghệ thuật
        concepMath: "", // Khái niệm toán học
    }, response_mode = 'blocking') => {
        try {
            // Tạo headers cho request
            const headers = {
                "Authorization": `Bearer ${process.env.KEY_PROJECT_AI}`, // Key truy cập API tạo hướng dẫn dự án
                "Content-Type": "application/json"
            };
            // Tạo body cho request
            const body = {
                inputs, // Dữ liệu đầu vào cho việc tạo hướng dẫn dự án
                response_mode, // Chế độ phản hồi (blocking/streaming)
                user, // Thông tin người dùng
            };
            // Gửi request đến API tạo hướng dẫn dự án
            const response = await fetch(`${process.env.BASE_URL_AI}/workflows/run`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            // Lấy dữ liệu phản hồi và trả về kết quả
            const data = await response.json();
            return data;
        } catch (error) {
            return { message: error.message }
        }
    }
};

module.exports = services;