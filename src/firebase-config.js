// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0XxRiTU_RfWznX62NsrzEQsZEW6k1h0s",
    authDomain: "stressdetectionapplication.firebaseapp.com",
    projectId: "stressdetectionapplication",
    storageBucket: "stressdetectionapplication.firebasestorage.app",
    messagingSenderId: "752241639782",
    appId: "1:752241639782:web:e5378d2768b1a1084a88a7",
    measurementId: "G-5M600L70J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);