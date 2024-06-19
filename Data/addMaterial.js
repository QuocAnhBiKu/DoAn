// addMaterial.js
const { db } = require('../src/configs/firebaseConfig');
const { doc, setDoc } = require('firebase/firestore');
const XLSX = require('xlsx');
const path = require('path');

// Function to read data from a specified sheet in the Excel file and add it to Firestore
async function addMaterialsDataToFirebase(sheetName) {
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
                const materialId = data.materialId;
                if (materialId) {
                    const materialRef = doc(db, 'Materials', materialId);
                    await setDoc(materialRef, data);
                    console.log(`Document added with ID: ${materialId}`, data);
                } else {
                    console.error('No materialId found in data:', data);
                }
            } catch (error) {
                console.error('Error adding document:', error);
            }
        }

        console.log('All materials data added to Firebase');
    } catch (error) {
        console.error('Error reading or processing the Excel file:', error);
    }
}

addMaterialsDataToFirebase('Materials'); // Replace 'Materials' with the name of the sheet you want to read from
