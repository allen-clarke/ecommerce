import React, { createContext, useContext, useEffect, useState } from "react";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  setPersistence,
  browserLocalPersistence,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Import Firestore database

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use authentication
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const [editingField, setEditingField] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("✅ Auth State Changed:", currentUser.email);

        // 🔹 Fetch admin status AFTER setting the user
        const adminStatus = await checkAdminStatus(currentUser.uid);
        setIsAdmin(adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Google Sign-In
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      await checkAdminStatus(result.user.uid);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // 🔹 Email & Password Sign-Up
  const signUpWithEmail = async (email, password) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(result.user);
      await setDoc(doc(db, "users", result.user.uid), { email });
      await checkAdminStatus(result.user.uid);
    } catch (error) {
      console.error("Sign-Up Error:", error);
      throw error;
    }
  };

  // 🔹 Email & Password Sign-In
  const signInWithEmail = async (email, password) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      await checkAdminStatus(result.user.uid);
    } catch (error) {
      console.error("Email Sign-In Error:", error);
      throw error;
    }
  };

  // 🔹 Passwordless Email Link Sign-In
  const sendEmailLink = async (email) => {
    const actionCodeSettings = {
      url: "http://localhost:3000/login", // Change to your deployment URL
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      alert("Check your email for the login link!");
    } catch (error) {
      console.error("Email Link Error:", error);
    }
  };

  // 🔹 Handle Email Link Login
  const handleEmailLinkLogin = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = prompt("Please enter your email to confirm sign-in");
      }
      try {
        const result = await signInWithEmailLink(
          auth,
          email,
          window.location.href
        );
        setUser(result.user);
        await checkAdminStatus(result.user.uid);
        window.localStorage.removeItem("emailForSignIn");
      } catch (error) {
        console.error("Email Link Sign-In Error:", error);
      }
    }
  };

  // 🔹 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
  };

  // 🔹 Check Admin Status from Firestore

  const checkAdminStatus = async (uid) => {
    if (!uid) {
      console.error("❌ No user ID provided!");
      return false;
    }

    try {
      const adminDoc = await getDoc(doc(db, "admins", uid));

      if (adminDoc.exists()) {
        setIsAdmin(adminDoc.exists());
        console.log("✅ Admin found in Firestore:", adminDoc.data());
        return true;
      } else {
        console.log("❌ User is NOT an admin.");
        return false;
      }
    } catch (error) {
      console.error("🔥 Error fetching admin status:", error);
      return false;
    }
  };

  // Update Name
  const handleUpdateName = async (displayName) => {
    try {
      await updateProfile(user, { displayName });
      setEditingField(null);
      setMessage("Name updated successfully!");
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    }
  };

  // Update Name
  const handleUpdatePhotoURL = async (photoURL) => {
    try {
      await updateProfile(user, { photoURL });
      setEditingField(null);
      setMessage("Photo updated successfully!");
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    }
  };

  // Update Email
  const handleUpdateEmail = async (email) => {
    try {
      await updateEmail(user, email);
      setEditingField(null);
      setMessage("Email updated successfully!");
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    }
  };

  // Update Password
  const handleUpdatePassword = async (password) => {
    try {
      if (password.length < 8) {
        setMessage("Password must be at least 8 characters long.");
        return;
      }
      await updatePassword(user, password);
      setEditingField(null);
      setMessage("Password updated successfully!");
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendEmailLink,
        handleEmailLinkLogin,
        logout,
        loading,

        editingField,
        setEditingField,
        message,
        setMessage,
        handleUpdateName,
        handleUpdatePhotoURL,
        handleUpdateEmail,
        handleUpdatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
