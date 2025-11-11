// ============================================================
// 📄 src/App.jsx
// ============================================================
// Enrutador principal del sistema SomnoLive.
// Define las rutas públicas y protegidas (según autenticación).
// Cumple con el requisito de mostrar un aviso de privacidad
// accesible desde el menú principal.
// ============================================================

import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setNavigator } from "./shared/navigation";

// 🧩 Páginas
import InicioBienvenida from "./pages/InicioBienvenida";
import MenuPrincipal from "./pages/MenuPrincipal";
import Detection from "./pages/Detection";
import Registros from "./pages/Registros";
import SesionDetalle from "./pages/SesionDetalle";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivacidadYSeguridad from "./pages/PrivacidadYSeguridad"; // Privacidad y Seguridad
import PautasSostenibles from "./pages/PautasSostenibles"; // Pautas 6.1

// 🔒 Rutas protegidas
import ProtectedRoute from "./routes/ProtectedRoute";

export default function AppWrapper() {
  const navigate = useNavigate();

  // Permite la navegación global desde otros módulos (por ejemplo, AuthContext)
  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <Routes>
      {/* 🌐 Rutas públicas */}
      <Route path="/" element={<InicioBienvenida />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 📜 Nueva ruta: Aviso de Privacidad y Seguridad */}
      <Route path="/privacidad" element={<PrivacidadYSeguridad />} />

      {/* ♻️ Nueva ruta: Consejos de Uso Sostenible */}
      <Route path="/pautas" element={<PautasSostenibles />} />

      {/* 🔐 Rutas protegidas (requieren login) */}
      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <MenuPrincipal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/detectar"
        element={
          <ProtectedRoute>
            <Detection />
          </ProtectedRoute>
        }
      />

      <Route
        path="/registros"
        element={
          <ProtectedRoute>
            <Registros />
          </ProtectedRoute>
        }
      />

      <Route
        path="/registros/:id"
        element={
          <ProtectedRoute>
            <SesionDetalle />
          </ProtectedRoute>
        }
      />

      {/* ⚠️ Ruta comodín (opcional): redirigir a inicio si no existe */}
      <Route path="*" element={<InicioBienvenida />} />
    </Routes>
  );
}
