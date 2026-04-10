// Firebase Configuration for NoteSphere Application
// This file contains the Firebase configuration and authentication setup

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLG3LCx-Ewyluf6VGl5Hi9DQK3BydiZpo",
    authDomain: "authexample-ee0b2.firebaseapp.com",
    projectId: "authexample-ee0b2",
    storageBucket: "authexample-ee0b2.firebasestorage.app",
    messagingSenderId: "965044955457",
    appId: "1:965044955457:web:6c161a5de2c7be3206d9c0",
    measurementId: "G-4SC23PZQMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

// Configure auth settings
auth.settings.appVerificationDisabledForTesting = false;

// Export the Firebase app instance for potential future use
export default app;