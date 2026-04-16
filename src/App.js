import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import MedicineList from "./components/MedicineList";
import OrderForm from "./components/OrderForm";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AuthPage />} />

        <Route
          path="/dashboard"
          element={
            user?.role === "USER" ? <Dashboard /> : <Navigate to="/" />
          }
        />

        <Route
          path="/admin"
          element={
            user?.role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/" />
          }
        />

        <Route path="/medicines" element={<MedicineList />} />

        <Route
          path="/order"
          element={
            user?.role === "USER" ? <OrderForm /> : <Navigate to="/" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;