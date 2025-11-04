// ============================================================
// 📄 COMPONENTE: MenuPrincipal.jsx
// ============================================================

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoSomno from "../assets/logo_somno1.png";

export default function MenuPrincipal() {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();

  // 🎨 Clase base para los botones principales
  const botonClase =
    "bg-white text-blue-800 px-8 py-3 text-lg font-bold rounded-xl shadow-xl hover:bg-blue-100 transition-all duration-200";

  // 🔚 Cierre de sesión seguro
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige al inicio
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f3c] to-[#1e3a8a] flex flex-col justify-center items-center px-6 text-white text-center relative">

      {/* 🔒 Botón Cerrar sesión */}
      {userId && (
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 text-white font-medium hover:underline text-sm"
        >
          Cerrar sesión
        </button>
      )}

      {/* 🧠 Logo institucional */}
      <img
        src={logoSomno}
        alt="Logo SomnoLive"
        className="w-48 h-48 mb-6 drop-shadow-md"
      />

      {/* 🏠 Título principal */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-wide">
        Bienvenido a SomnoLive
      </h1>

      {/* 📜 Descripción */}
      <p className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed text-slate-100">
        Esta herramienta está diseñada para{" "}
        <strong className="text-sky-300 font-semibold">
          personas que estudian o trabajan muchas horas frente a una pantalla
        </strong>
        . Detecta en tiempo real{" "}
        <strong className="text-sky-300 font-semibold">parpadeos</strong>,{" "}
        <strong className="text-sky-300 font-semibold">microsueños</strong> y{" "}
        <strong className="text-sky-300 font-semibold">bostezos</strong>{" "}
        para prevenir la fatiga, mejorar el bienestar y mantener la productividad.
      </p>

      {/* 🚀 Botones principales del menú */}
      {userId && (
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link to="/detectar">
            <button className={botonClase}>Iniciar detección</button>
          </Link>
          <Link to="/registros">
            <button className={botonClase}>Ver registros</button>
          </Link>
        </div>
      )}

      {/* 💻 Descarga de versión de escritorio */}
      <div className="mt-8 bg-white/10 p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-2 text-sky-200">
          ¿Trabajas en segundo plano?
        </h2>
        <p className="text-slate-100 mb-4">
          Para ejecutar la detección en segundo plano sin interrupciones, puedes
          descargar la versión de escritorio para Windows.
        </p>

        <a
          href="https://drive.google.com/uc?export=download&id=1WoiVSLM6LX_-z0jJDOv9G5dp-3wjrhBi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-200"
        >
          Descargar versión de escritorio
        </a>
      </div>

      {/* 🔐 Enlace discreto al Aviso de Privacidad y Seguridad */}
      <div className="mt-10 text-center">
        <Link
          to="/privacidad"
          className="text-slate-300 text-sm hover:text-sky-300 transition-all duration-200"
        >
          🔒 Aviso de Privacidad y Seguridad
        </Link>
      </div>

      {/* 📜 Pie institucional */}
      <footer className="mt-6 text-xs text-slate-400">
        © 2025 SomnoLive — Cumple con la Ley N.º 29733 y ISO/IEC 27001: Seguridad y Privacidad de la Información.
      </footer>
    </div>
  );
}
