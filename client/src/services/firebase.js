// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAQa7j-w3Uh5Kyl5SZa2aQl-5YQnYuPTO8",
  authDomain: "reeltalks-b791d.firebaseapp.com",
  projectId: "reeltalks-b791d",
  storageBucket: "reeltalks-b791d.appspot.com",
  messagingSenderId: "957849461098",
  appId: "1:957849461098:web:270e51dea254f15d414513",
  measurementId: "G-J2DBHKWDFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
