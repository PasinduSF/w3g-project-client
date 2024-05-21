importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDOjNiHRJzoPar6gyNB5nm3EfQov2z4qjk",
  authDomain: "w3g-project.firebaseapp.com",
  projectId: "w3g-project",
  storageBucket: "w3g-project.appspot.com",
  messagingSenderId: "163943153277",
  appId: "1:163943153277:web:aa2dbd429d7f8c34f4bb14",
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
