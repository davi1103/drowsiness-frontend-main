// ============================================================
// 📘 COMPONENTE: RecomendacionSomnolencia.jsx
// Tarjeta profesional + animada con recomendaciones dinámicas
// ============================================================

import React from "react";
import { motion } from "framer-motion";

export default function RecomendacionSomnolencia({ probabilidad }) {
  let titulo = "";
  let mensaje = "";
  let color = "";
  let icono = "";

  // ===========================
  // Selección según nivel
  // ===========================
  if (probabilidad < 30) {
    titulo = "Nivel Bajo";
    color = "bg-green-100 border-green-400 text-green-800";
    icono = "🟢";
    mensaje =
      "Estás en un nivel saludable de atención. Mantén el buen ritmo y recuerda hacer pequeñas pausas visuales. ¡Vas muy bien!";
  } else if (probabilidad < 60) {
    titulo = "Nivel Moderado";
    color = "bg-yellow-100 border-yellow-400 text-yellow-800";
    icono = "🟡";
    mensaje =
      "Empiezas a mostrar señales leves de cansancio. Tómate un minuto para respirar y relajar la vista. Eso ayuda bastante.";
  } else if (probabilidad < 80) {
    titulo = "Nivel Alto";
    color = "bg-orange-100 border-orange-400 text-orange-800";
    icono = "🟠";
    mensaje =
      "Tu concentración está bajando. Una breve pausa puede marcar la diferencia. Te recomendamos descansar antes de continuar.";
  } else {
    titulo = "Nivel Crítico";
    color = "bg-red-100 border-red-400 text-red-800";
    icono = "🔴";
    mensaje =
      "Tu nivel de somnolencia es muy alto. Esto puede afectar tu seguridad. Por favor toma un descanso real antes de continuar.";
  }

  // Animación suave al aparecer o cambiar
  return (
    <motion.div
      key={titulo}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full border-l-4 p-4 rounded-lg shadow ${color}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{icono}</span>
        <div>
          <h3 className="font-semibold text-lg">{titulo}</h3>
          <p className="text-sm leading-relaxed mt-1">{mensaje}</p>
        </div>
      </div>
    </motion.div>
  );
}
