import { useState } from "react";

const firebaseRestErrorMessages = {
  "Firebase: Error (auth/email-already-in-use).":
    "This email is already in use.",
  "Firebase: Error (auth/operation-not-allowed).":
    "Password sign-in is disabled.",
  "Firebase: Error (auth/too-many-attempts-try-later).":
    "Too many attempts. Try again later.",
  "Firebase: Error (auth/email-not-found).":
    "No account found with this email.",
  "Firebase: Error (auth/invalid-password).": "Incorrect password.",
  "Firebase: Error (auth/user-disabled).":
    "This user account has been disabled.",
  "Firebase: Error (auth/invalid-credential).": "Invalid email or password.",
};

export const useLoginOrSignupErrors = () => {
  const [authError, setAuthError] = useState("");

  const handleAuthError = (error) => {
    const userMessage =
      firebaseRestErrorMessages[error.message] ||
      "An unexpected error occurred.";
    setAuthError(userMessage);
  };

  const clearAuthError = () => setAuthError("");

  return { authError, handleAuthError, clearAuthError };
};
