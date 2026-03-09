import { useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ValidationPage from "./pages/ValidationPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("token")));

  if (!isAuthenticated) {
    return (
      <Layout>
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      </Layout>
    );
  }

  return (
    <Layout>
      <nav style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <Link to="/">Dashboard</Link>
        <Link to="/validation">Validation</Link>
      </nav>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/validation" element={<ValidationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}