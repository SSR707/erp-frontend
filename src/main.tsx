import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import QueryProviderComponent from "@/providers/QueryProviderComponent.tsx";
import "@/assets/css/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryProviderComponent>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryProviderComponent>
);  
