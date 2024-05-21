
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDOjNiHRJzoPar6gyNB5nm3EfQov2z4qjk",
  authDomain: "w3g-project.firebaseapp.com",
  projectId: "w3g-project",
  storageBucket: "w3g-project.appspot.com",
  messagingSenderId: "163943153277",
  appId: "1:163943153277:web:aa2dbd429d7f8c34f4bb14",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
