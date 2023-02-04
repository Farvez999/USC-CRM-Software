// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqsftFKg9ccP900JjtHtOQXUyUd0OA-jU",
  authDomain: "usc-crm.firebaseapp.com",
  projectId: "usc-crm",
  storageBucket: "usc-crm.appspot.com",
  messagingSenderId: "242911455701",
  appId: "1:242911455701:web:1a34a5142d4c436a0d355c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;