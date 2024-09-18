// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxv2Jr5tIEf2N7AT6J6B7FClHazip_U-A",
  authDomain: "sky-view-51016.firebaseapp.com",
  projectId: "sky-view-51016",
  storageBucket: "sky-view-51016.appspot.com",
  messagingSenderId: "751750206693",
  appId: "1:751750206693:web:b2631c87653e03b206300c",
  measurementId: "G-ZJ96W8GE76"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
// Initialize Firebase

export { auth };
export default db;
