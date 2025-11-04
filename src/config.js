// ✅ config.js

let API_URL = "";

// Detectar si estamos en entorno de desarrollo (localhost con Vite)
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  API_URL = "http://localhost:3001";
} else {
  // Producción (Vercel)
  API_URL = import.meta.env.VITE_API_URL || "https://drowsiness-backend-main-production.up.railway.app";
}

export { API_URL };
