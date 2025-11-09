import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ApiProvider } from "./contexts/ApiContext"; // adjust path
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ApiProvider>
    <App />
  </ApiProvider>
);