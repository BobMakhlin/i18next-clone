import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { ThemeContextProvider } from "./store/theme-context";
import { TranslationContextProvider } from "./store/translation-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <TranslationContextProvider>
        <App />
      </TranslationContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
);
