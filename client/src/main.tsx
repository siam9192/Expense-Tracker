import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppBrowserRouter from "./router/AppBrowserRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppBrowserRouter/>
  </StrictMode>,
);
