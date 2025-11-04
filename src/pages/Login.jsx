// ================================================
// 📄 src/pages/Login.jsx
// ================================================
// Página de inicio de sesión con username y password.
// Corregido para evitar bucles infinitos en la redirección.
// ================================================

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUsuario } from "../shared/api";

export default function Login() {
  const { login, userId } = useAuth(); // Contexto global de autenticación
  const navigate = useNavigate();

  // Estado local del formulario
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false); // 🧩 evita redirecciones múltiples

  // ===================================================
  // 🚦 Redirección si el usuario ya está autenticado
  // ===================================================
  useEffect(() => {
    if (userId && !isRedirecting) {
      console.log("✅ Usuario autenticado, redirigiendo al menú...");
      setIsRedirecting(true); // Bloquea redirecciones repetidas
      setTimeout(() => navigate("/menu"), 300); // Pequeña espera para estabilizar render
    }
  }, [userId]); // ❗️ quitamos navigate de dependencias para evitar loop

  // 📥 Captura los cambios en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===================================================
  // 🚀 Enviar formulario de login
  // ===================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validar campos vacíos
    if (!form.username || !form.password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      // Enviar datos al backend (username y password)
      const res = await loginUsuario(form.username, form.password);
      console.log("✅ Login exitoso:", res);

      // Verificar respuesta válida del backend
      if (res && res.token && res.userId && res.username) {
        // Guarda datos en el contexto global
        login(res.userId, res.username, res.token);
        // Redirigir al menú (solo una vez)
        setIsRedirecting(true);
        navigate("/menu");
      } else {
        throw new Error("Respuesta del servidor incompleta");
      }
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err.message);
      setError("Credenciales incorrectas o usuario no autorizado");
    }
  };

  // ===================================================
  // 🎨 Render del formulario
  // ===================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f3c] to-[#1e3a8a] flex flex-col justify-center items-center px-6 text-white relative">

      {/* 🔙 Botón Volver al Inicio */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-white hover:underline text-sm font-medium transition"
      >
        ← Volver al inicio
      </Link>

      <h1 className="text-4xl font-bold mb-6">Iniciar sesión</h1>

      {/* 🧾 Formulario principal */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        {/* 🧑 Campo Nombre de usuario */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Nombre de usuario
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="Ej: usuario_123"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* 🔑 Campo Contraseña con botón de mostrar/ocultar */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="********"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-8 right-3 text-gray-500 hover:text-gray-800"
            tabIndex={-1}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* ⚠️ Mensaje de error */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* 🟦 Botón principal */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
          disabled={isRedirecting}
        >
          {isRedirecting ? "Redirigiendo..." : "Iniciar sesión"}
        </button>

        {/* 🔗 Enlace a registro */}
        <div className="mt-4 text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-700 font-medium underline">
            Regístrate aquí
          </Link>
        </div>
      </form>
    </div>
  );
}
