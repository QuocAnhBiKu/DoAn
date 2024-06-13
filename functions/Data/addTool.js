// addTool.js
const { db } = require('../src/configs/firebaseConfig');
const { doc, setDoc } = require('firebase/firestore');
const XLSX = require('xlsx');
const path = require('path');

// Function to read data from a specified sheet in the Excel file and add it to Firestore
async function addToolsDataToFirebase(sheetName) {
    try {
        // Read the Excel file
        const filePath = path.join(__dirname, 'courseInfoStructure.xlsx'); // Ensure to specify the correct file name
        const workbook = XLSX.readFile(filePath);

        // Check if the specified sheet name exists
        if (!workbook.SheetNames.includes(sheetName)) {
            throw new Error(`Sheet "${sheetName}" not found in the workbook`);
        }

        // Get the specified sheet
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        for (const data of jsonData) {
            try {
                const toolId = data.toolId;
                if (toolId) {
                    const toolRef = doc(db, 'Tools', toolId);
                    await setDoc(toolRef, data);
                    console.log(`Document added with ID: ${toolId}`, data);
                } else {
                    console.error('No toolId found in data:', data);
                }
            } catch (error) {
                console.error('Error adding document:', error);
            }
        }

        console.log('All tools data added to Firebase');
    } catch (error) {
        console.error('Error reading or processing the Excel file:', error);
    }
}

addToolsDataToFirebase('Tools');