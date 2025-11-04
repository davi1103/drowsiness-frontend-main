// ================================================
// 📦 src/shared/api.js
// ================================================


import { API_URL } from "../config"; // 🌐 URL base del backend
import { guardarToken, obtenerToken, eliminarToken } from "./auth"; // 🔑 Manejo del token JWT
import { goToLogin } from "./navigation"; // 🔁 Redirección al login cuando expira la sesión

// ======================================================
// 🧱 1️⃣ Construir headers (cabeceras) para cada petición
// ======================================================
// Si el usuario está logueado, se agrega el token JWT a las cabeceras
function construirHeaders() {
  const token = obtenerToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// ====================================================================
// ⚙️ 2️⃣ Manejar respuesta del servidor y errores (401 = sesión expirada)
// ====================================================================
async function manejarRespuesta(res) {
  if (res.status === 401) {
    eliminarToken(); // 🧹 Limpia el token si está vencido
    goToLogin(); // 🔁 Redirige al login
    throw new Error("Sesión expirada");
  }

  if (!res.ok) {
    // Intenta leer el mensaje de error enviado por el backend
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Error desconocido");
  }

  return await res.json(); // ✅ Devuelve la respuesta parseada
}

// ======================================================
// 🔐 3️⃣ Login de usuario (username + password)
// ======================================================
export async function loginUsuario(username, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await manejarRespuesta(res);

    // Verifica que el backend haya respondido correctamente
    if (!data.token || !data.userId || !data.username) {
      throw new Error("Respuesta incompleta del servidor");
    }

    // Guarda el token en localStorage para las siguientes peticiones
    guardarToken(data.token);

    // Devuelve los datos necesarios para el AuthContext
    return {
      token: data.token,
      userId: data.userId,
      username: data.username,
    };
  } catch (err) {
    console.error("loginUsuario error:", err.message);
    throw err;
  }
}

// ======================================================
// 🆕 4️⃣ Registro de usuario (username + password)
// ======================================================
export async function registrarUsuario(username, password) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), // 👈 usamos username en lugar de email
    });

    return await manejarRespuesta(res);
  } catch (err) {
    console.error("registrarUsuario error:", err.message);
    throw err;
  }
}

// ======================================================
// 🎬 5️⃣ Crear una nueva sesión de monitoreo
// ======================================================
export async function crearSesion() {
  try {
    const res = await fetch(`${API_URL}/sesiones`, {
      method: "POST",
      headers: construirHeaders(), // incluye el token del usuario
    });

    return await manejarRespuesta(res);
  } catch (err) {
    console.error("crearSesion error:", err.message);
    return null;
  }
}

// ======================================================
// 📊 6️⃣ Registrar un evento (parpadeo, bostezo, etc.)
// ======================================================
export async function registrarEvento(evento) {
  try {
    const res = await fetch(`${API_URL}/eventos`, {
      method: "POST",
      headers: construirHeaders(),
      body: JSON.stringify(evento),
    });

    return await manejarRespuesta(res);
  } catch (err) {
    console.error("registrarEvento error:", err.message);
    return null;
  }
}

// ======================================================
// 🕒 7️⃣ Finalizar sesión activa (cuando el usuario detiene el monitoreo)
// ======================================================
export async function finalizarSesion(id, data) {
  try {
    const res = await fetch(`${API_URL}/sesiones/${id}/finalizar`, {
      method: "PATCH",
      headers: construirHeaders(),
      body: JSON.stringify(data),
    });

    return await manejarRespuesta(res);
  } catch (err) {
    console.error("finalizarSesion error:", err.message);
    return null;
  }
}

// ======================================================
// 📚 8️⃣ Obtener todas las sesiones del usuario logueado
// ======================================================
export async function getSesiones() {
  try {
    const res = await fetch(`${API_URL}/sesiones`, {
      headers: construirHeaders(),
    });

    return await manejarRespuesta(res);
  } catch (err) {
    console.error("getSesiones error:", err.message);
    return [];
  }
}

// ======================================================
// 🔍 9️⃣ Obtener una sesión específica por su ID
// ======================================================
export async function getSesionPorId(id) {
  try {
    const res = await fetch(`${API_URL}/sesiones/${id}`, {
      headers: construirHeaders(),
    });

    return await manejarRespuesta(res);
  } catch (err) {
    console.error("getSesionPorId error:", err.message);
    return null;
  }
}
