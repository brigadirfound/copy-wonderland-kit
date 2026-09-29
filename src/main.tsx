import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initLook } from "./lib/look";
import "./index.css";

initLook();

createRoot(document.getElementById("root")!).render(<App />);
