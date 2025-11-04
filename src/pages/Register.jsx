// ================================================
// 📄 src/pages/Register.jsx
// ================================================

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrarUsuario } from "../shared/api";

export default function Register() {
  // Estado del formulario
  const [form, setForm] = useState({ username: "", password: "", repassword: "" });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const navigate = useNavigate();

  // 📥 Manejar cambios en los campos
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===================================================
  // ✅ Validaciones
  // ===================================================
  // 🔹 Username: debe tener entre 4 y 15 caracteres, letras y números
  const usernameValido = /^[a-zA-Z0-9_]{4,15}$/;
  // 🔹 Contraseña segura: 8+ caracteres, una mayúscula, una minúscula, un número
  const passwordSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  // ===================================================
  // 🚀 Envío del formulario
  // ===================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    // 🔸 Validar formato de username
    if (!usernameValido.test(form.username)) {
      setError(
        "El nombre de usuario debe tener entre 4 y 15 caracteres, solo letras, números o guiones bajos."
      );
      return;
    }

    // 🔸 Validar formato de contraseña
    if (!passwordSegura.test(form.password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
      );
      return;
    }

    // 🔸 Confirmar contraseñas iguales
    if (form.password !== form.repassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // 🧩 Si todo está bien → enviar al backend
    try {
      await registrarUsuario(form.username, form.password);
      setExito("✅ Usuario registrado correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("❌ Error al registrar:", err.message);
      setError(err.message || "Error al registrar usuario.");
    }
  };

  // ===================================================
  // 🎨 Render del formulario
  // ===================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f3c] to-[#1e3a8a] flex flex-col justify-center items-center px-6 text-white relative">
      {/* 🔙 Botón volver */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-white hover:underline text-sm font-medium transition"
      >
        ← Volver al inicio
      </Link>

      <h1 className="text-4xl font-bold mb-6">Crear cuenta</h1>

      {/* Formulario principal */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        {/* 🧑 Campo username */}
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
          <p className="text-xs text-gray-500 mt-1">
            Usa entre 4 y 15 caracteres (letras, números o _).
          </p>
        </div>

        {/* 🔑 Campo Contraseña */}
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

        {/* 🔁 Campo Repetir Contraseña */}
        <div className="relative">
          <label htmlFor="repassword" className="block text-sm font-medium">
            Repetir contraseña
          </label>
          <input
            type={showRePassword ? "text" : "password"}
            name="repassword"
            value={form.repassword}
            onChange={handleChange}
            required
            placeholder="********"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
          />
          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute top-8 right-3 text-gray-500 hover:text-gray-800"
            tabIndex={-1}
          >
            {showRePassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* ⚠️ Mensajes de error o éxito */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {exito && <p className="text-green-600 text-sm">{exito}</p>}

        {/* 🟦 Botón de registro */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Registrarse
        </button>

        {/* 🔗 Enlace a login */}
        <div className="mt-4 text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-700 font-medium underline">
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
}
