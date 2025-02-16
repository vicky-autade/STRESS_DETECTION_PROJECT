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

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ✅ Handle notification clicks
self.addEventListener("notificationclick", function (event) {
    console.log("🔔 Notification clicked:", event.notification);
    event.notification.close();

    // ✅ Extract the correct URL from event.notification.data
    const notificationData = event.notification.data || {};
    const clickUrl = notificationData.url || "https://stress-detection-project.vercel.app";

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
            if (clientList.length > 0) {
                clientList[0].focus();
            } else {
                clients.openWindow(clickUrl);
            }
        })
    );
});

// ✅ Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log("📩 Received background message:", payload);

    const { title, body } = payload.notification || {};
    const data = payload.data || {};

    const notificationOptions = {
        body: body || "You have a new message!",
        data, // ✅ Store data in the notification
        // icon: "/firebase-logo.png",
    };

    self.registration.showNotification(title || "New Notification", notificationOptions);
});
