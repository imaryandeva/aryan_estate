// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mearn-estate-6b77c.firebaseapp.com",
	projectId: "mearn-estate-6b77c",
	storageBucket: "mearn-estate-6b77c.appspot.com",
	messagingSenderId: "771970333878",
	appId: "1:771970333878:web:adf2d23f2a440af0df3a17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);