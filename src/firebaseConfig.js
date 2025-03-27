import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8jOOxqvbkHXoIOxm9PLFBXrpI0gsz11A",
  authDomain: "e-commerce-b6457.firebaseapp.com",
  projectId: "e-commerce-b6457",
  storageBucket: "e-commerce-b6457.firebasestorage.app",
  messagingSenderId: "677047367286",
  appId: "1:677047367286:web:5b0157d4cd15faef5a5157",
  measurementId: "G-F1VPY7KLWK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
