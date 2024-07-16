WELCOME TO THE DOCS FOR BACKEND GENERATE-AI-DOCS
*SETUP BACKEND*
npm install
*SETUP FIREBASE*
First, you need to create or login account with Firebase(https://firebase.google.com/) then click "Go to the console", then create a new project. Follow the instruction of Firebase.
*CONNECT FIREBASE*
Pay attention to the gear icon on the right side of the Project Overview. Click on it and select Project Settings -> General. Scroll down and click on the </> icon. Follow the Firebase setup instructions, then copy the following code:
const firebaseConfig = {
  apiKey: "Your-api",
  authDomain: "Your-api",
  projectId: "Your-api",
  storageBucket: "Your-api",
  messagingSenderId: "Your-api",
  appId: "Your-api",
  measurementId: "Your-api"
};
Paste this into the firebaseConfig.js file in the configs directory. Replace the placeholders with the actual values from the Firebase setup. This completes the Firebase connection setup.
*CREATE DATABASE*
After creating a new connect firebase, navigate to Build -> Firestore Database on the left-hand side and click on "Create Database." Follow the Firebase instructions to complete the setup. Once done, go to the Rules tab and modify them to the following:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; 
    }
  }
}
Then click "Publish." Your Firebase Firestore database is now successfully created.
*SETUP AUTHENTICATION*
Next, navigate to Build -> Authentication on the left-hand side and click on "Get Started." A list of available sign-in methods will appear; select Google and click on it. Then, enable Google sign-in and choose the support email for the project, which should be the email you logged in with earlier. Click "Save." This completes the authentication setup. You can now go to the Users tab to see the accounts that have signed in using Google. 
*SET FIREBASE ADMIN RIGHTS TO HANDLE THE PERMISSIONS PART*
Follow the steps in "connect firebase," then select the Service accounts tab. Scroll down and click on "Generate new private key" to download the file. Once downloaded, rename the file to serviceAccountKey.json. Then, copy this file into the configs directory. This completes the setup.
*Setup Funcitons*
Navigate to Build -> Functions on the left-hand side and click on "Upgrade Project." Follow the Firebase instructions to upgrade your project (note that deploying server-side functions with Firebase will incur costs). Once the upgrade is complete, click "Get Started" and follow the Firebase instructions to set up Cloud Functions. This completes the process.