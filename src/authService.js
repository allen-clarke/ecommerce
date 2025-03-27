import { auth, db, googleProvider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Email & Password Signup
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error.message;
  }
};

// Email & Password Login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error.message;
  }
};

// Google Sign-In
export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error.message;
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error.message;
  }
};

// Check if User is an Admin
export const isAdmin = async (user) => {
  if (!user) return false;
  const adminRef = doc(db, "admin", user.uid);
  const adminDoc = await getDoc(adminRef);
  return adminDoc.exists();
};

// Observe Authentication State & Check Admin Status
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user && (await isAdmin(user))) {
      callback({ user, isAdmin: true });
    } else {
      callback({ user: null, isAdmin: false });
    }
  });
};

// Email Link Sign-In Configuration
const actionCodeSettings = {
  url: "http://localhost:3000", // Change to your deployed domain
  handleCodeInApp: true,
};

// Send Sign-In Link
export const sendSignInEmail = async (email) => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    localStorage.setItem("emailForSignIn", email);
    return "Sign-in link sent! Check your email.";
  } catch (error) {
    throw error.message;
  }
};

// Complete Sign-In with Email Link
export const completeSignInWithEmailLink = async () => {
  try {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please enter your email:");
      }
      const userCredential = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      localStorage.removeItem("emailForSignIn");
      return userCredential.user;
    }
  } catch (error) {
    throw error.message;
  }
};
