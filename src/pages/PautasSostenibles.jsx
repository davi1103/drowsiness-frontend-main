// ============================================================
// 📄 PÁGINA: PautasSostenibles.jsx
// ============================================================
// Contiene recomendaciones de uso sostenible para reducir el
// consumo de recursos y fomentar hábitos responsables.
// Cumple con el requisito 6.1 del checklist ambiental.
// ============================================================

import React from "react";
import { Link } from "react-router-dom";

export default function PautasSostenibles() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          🌱 Consejos de Uso Sostenible
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            1. Uso responsable del sistema
          </h2>
          <p className="text-sm leading-relaxed">
            Activa la cámara solo cuando sea necesario y cierra la sesión al
            terminar tu monitoreo. Esto reduce el consumo de energía y libera
            recursos del dispositivo.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            2. Optimiza tu entorno de trabajo
          </h2>
          <p className="text-sm leading-relaxed">
            Mantén abiertas solo las pestañas o aplicaciones que utilices.
            Evita procesos en segundo plano que consuman CPU o batería.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            3. Reduce el brillo y utiliza el modo oscuro
          </h2>
          <p className="text-sm leading-relaxed">
            El modo oscuro ayuda a disminuir el consumo energético de la
            pantalla, especialmente en monitores OLED o portátiles.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            4. Usa el modo ahorro de SomnoLive
          </h2>
          <p className="text-sm leading-relaxed">
            Cuando trabajes con batería o en conexión limitada, activa el modo
            ahorro para reducir la frecuencia de análisis y el envío de datos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            5. Cuidado del equipo y desconexión
          </h2>
          <p className="text-sm leading-relaxed">
            Descansa tu dispositivo después de largas sesiones de uso y evita
            mantener la cámara activa cuando no estés frente a la pantalla.
          </p>
        </section>

        <div className="text-center">
          <Link
            to="/menu"
            className="inline-block px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
          >
            ← Volver al menú
          </Link>
        </div>
      </div>
    </div>
  );
}
