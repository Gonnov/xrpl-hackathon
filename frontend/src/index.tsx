import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NewBl } from "./screens/NewBl";
import { DocumentsUpload } from "./screens/Documents/DocumentsUpload";
import { Notification } from "./screens/Notification";
import { ContractFormPage } from "./screens/ContractFormPage";
import { PaymentPage } from "./screens/PaymentPage";
import { Summary } from "./screens/Summary";
import { Dashboard } from "./screens/Dashboard";
import { Toaster } from "./components/Toaster";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contract" element={<ContractFormPage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/documents" element={<DocumentsUpload />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/verification" element={<NewBl />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
      <Toaster />
    </Router>
  </StrictMode>
);