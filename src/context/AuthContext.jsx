// ================================================
// 📄 src/context/AuthContext.jsx
// ================================================
// Contexto global para manejar autenticación del usuario
// Guarda userId (clave única), username (alias visible) y token JWT.
// ================================================

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estado global del usuario autenticado
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // 🧠 Al montar, intenta restaurar sesión guardada en localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("jwt_token");

    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setToken(storedToken);
      if (storedUsername) setUsername(storedUsername);
      console.log("🔄 Sesión restaurada:", storedUsername || storedUserId);
    }
  }, []);

  // ===================================================
  // 🚀 Función para iniciar sesión
  // Guarda datos del usuario y token en memoria y en localStorage
  // ===================================================
  const login = (id, usernameValue, tokenValue) => {
    setUserId(id);
    setUsername(usernameValue);
    setToken(tokenValue);

    localStorage.setItem("userId", id);
    localStorage.setItem("username", usernameValue);
    localStorage.setItem("jwt_token", tokenValue);

    console.log("✅ Login exitoso:", usernameValue, id);
  };

  // ===================================================
  // 🔒 Cerrar sesión
  // Limpia los estados y el localStorage
  // ===================================================
  const logout = () => {
    setUserId(null);
    setUsername(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("jwt_token");
    console.log("👋 Sesión cerrada");
  };

  // ===================================================
  // 🌎 Valores accesibles desde cualquier parte de la app
  // ===================================================
  return (
    <AuthContext.Provider
      value={{
        userId,
        username,
        token,
        isAuth: !!token, // devuelve true si el token existe
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ===================================================
// 🧩 Hook personalizado para acceder fácilmente al contexto
// ===================================================
export function useAuth() {
  return useContext(AuthContext);
}
