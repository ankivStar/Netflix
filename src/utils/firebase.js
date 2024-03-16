// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWECWcb06HzySSFFZlz23pDS5KWgP_Erw",
  authDomain: "netflixgpt-31a47.firebaseapp.com",
  projectId: "netflixgpt-31a47",
  storageBucket: "netflixgpt-31a47.appspot.com",
  messagingSenderId: "987158992038",
  appId: "1:987158992038:web:02a2c9a081ce741e101067",
  measurementId: "G-70JJBBT0Y3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();