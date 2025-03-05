// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAWetkBfs1ycyyyr3BYQmofmW8wAg5D15Y",
  authDomain: "landingpage-generator-io.firebaseapp.com",
  projectId: "landingpage-generator-io",
  storageBucket: "landingpage-generator-io.firebasestorage.app",
  messagingSenderId: "1045655766400",
  appId: "1:1045655766400:web:30054b5e37023a9f5ead65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore("landingpages");
const auth = getAuth(app);

export { db, auth };
