import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "boxicons/css/boxicons.min.css";
import ContextProvider from "./context/CartQuantity.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ContextProvider>
);
