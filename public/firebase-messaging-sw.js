importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

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
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message:", payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        // icon: "/firebase-logo.png",
    });
});