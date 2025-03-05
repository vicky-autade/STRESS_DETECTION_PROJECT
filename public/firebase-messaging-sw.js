importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");


// ✅ Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyA0XxRiTU_RfWznX62NsrzEQsZEW6k1h0s",
    authDomain: "stressdetectionapplication.firebaseapp.com",
    projectId: "stressdetectionapplication",
    storageBucket: "stressdetectionapplication.firebasestorage.app",
    messagingSenderId: "752241639782",
    appId: "1:752241639782:web:e5378d2768b1a1084a88a7",
    measurementId: "G-5M600L70J9"
});

// ✅ Retrieve Firebase Messaging
const messaging = firebase.messaging();

// ✅ Handle notification clicks
self.addEventListener("notificationclick", function (event) {
    console.log("🔔 Notification clicked:", event.notification);
    event.notification.close();

    // ✅ Extract the correct URL
    const clickUrl = event.notification.data?.url || event.notification.data?.click_action || "https://stress-detection-project.vercel.app";

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

// ✅ Handle background messages (when app is closed)
messaging.onBackgroundMessage((payload) => {
    console.log("📩 Background message received:", payload);

    const title = payload.data?.title || "New Notification";
    const body = payload.data?.body || "You have a new message!";
    const data = payload.data || {};

    self.registration.showNotification(title || "New Notification", {
        body: body || "You have a new message!",
        data, // ✅ Store data to retrieve it in click event
        icon: "/firebase-logo.png",
    });
});
