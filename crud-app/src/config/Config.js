// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaTrp8K9TpO4boyPkS_WzeAHTCSLwlBmE",
  authDomain: "crud-app-75430.firebaseapp.com",
  projectId: "crud-app-75430",
  storageBucket: "crud-app-75430.appspot.com",
  messagingSenderId: "962662167854",
  appId: "1:962662167854:web:efda73e14aa2047ccc36bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
