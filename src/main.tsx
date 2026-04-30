import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // HashRouter 제거
import "./styles/index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";
import { Analytics } from "@vercel/analytics/react";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
);
