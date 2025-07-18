import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import "./css/App.css";
import "./css/FontAwesome.css";
import "./css/AuthStyles.css";
import App from "./App.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
