// ============================================================
// 📄 PÁGINA: PautasSostenibles.jsx
// ------------------------------------------------------------
// Esta página forma parte de la Fase 6: Participación y
// Educación de los Usuarios, cumpliendo específicamente con
// el requisito 6.1 del checklist ambiental.
//
// Proporciona mensajes claros que fomentan:
//  - Uso responsable del sistema SomnoLive
//  - Reducción del consumo energético
//  - Hábitos tecnológicos sostenibles
//  - Mayor conciencia digital
//
// Además, su implementación asegura que la interfaz incluya
// contenido educativo accesible desde el menú inicial.
// ============================================================

import React from "react";
import { Link } from "react-router-dom";

export default function PautasSostenibles() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        
        {/* ==============================
            TÍTULO PRINCIPAL
        =============================== */}
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          🌱 Consejos de Uso Sostenible en SomnoLive
        </h1>

        <p className="text-gray-600 text-center mb-8 text-sm">
          Estas recomendaciones te ayudarán a utilizar SomnoLive de manera
          responsable, optimizando el rendimiento de tu equipo y reduciendo
          el consumo energético asociado al monitoreo en tiempo real.
        </p>

        {/* ====================================================
            SECCIÓN 1 – USO RESPONSABLE DEL SISTEMA
        ===================================================== */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            1. Activa SomnoLive solo cuando lo necesites
          </h2>
          <p className="text-sm leading-relaxed">
            El procesamiento de video requiere recursos del sistema.  
            Úsalo únicamente durante sesiones de estudio o trabajo
            prolongadas para reducir el consumo de energía y alargar
            la vida útil del equipo.
          </p>
        </section>

        {/* ====================================================
            SECCIÓN 2 – OPTIMIZAR EL ENTORNO DIGITAL
        ===================================================== */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            2. Minimiza procesos en segundo plano
          </h2>
          <p className="text-sm leading-relaxed">
            Mantén abiertas solo las aplicaciones necesarias.  
            Esto reduce el consumo de CPU/RAM y permite que SomnoLive
            analice tus expresiones de forma más eficiente.
          </p>
        </section>

        {/* ====================================================
            SECCIÓN 3 – CONFIGURACIONES VISUALES EFICIENTES
        ===================================================== */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            3. Utiliza el modo oscuro y ajusta el brillo
          </h2>
          <p className="text-sm leading-relaxed">
            Las pantallas brillantes incrementan el gasto energético
            y la fatiga visual.  
            Activar el modo oscuro y reducir el brillo favorece
            el ahorro energético y tu bienestar ocular.
          </p>
        </section>

        {/* ====================================================
            SECCIÓN 4 – MODO AHORRO DE SOMNOLIVE
        ===================================================== */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            4. Usa el Modo Ahorro en equipos portátiles
          </h2>
          <p className="text-sm leading-relaxed">
            Si trabajas con batería, activa el modo ahorro de SomnoLive.  
            Esta función reduce la frecuencia de análisis y disminuye
            la carga sobre el procesador.
          </p>
        </section>

        {/* ====================================================
            SECCIÓN 5 – DESCANSO DEL EQUIPO
        ===================================================== */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            5. Descansa el dispositivo periódicamente
          </h2>
          <p className="text-sm leading-relaxed">
            Evita mantener la cámara activa por periodos innecesarios.  
            Cerrar SomnoLive al finalizar tu sesión reduce el consumo
            energético global y previene el desgaste del hardware.
          </p>
        </section>

        {/* ====================================================
            SECCIÓN 6 – BENEFICIOS AMBIENTALES
        ===================================================== */}
        <section className="mb-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            🌍 ¿Cómo contribuyes al ambiente?
          </h2>
          <ul className="list-disc ml-6 text-sm leading-relaxed text-gray-700">
            <li>Reduces el consumo energético de tu equipo.</li>
            <li>Disminuyes emisiones indirectas de carbono asociadas al uso digital.</li>
            <li>Promueves prácticas de tecnología responsable.</li>
            <li>Ayudas a que SomnoLive mantenga un comportamiento sostenible.</li>
          </ul>
        </section>

        {/* ==============================
            BOTÓN DE RETORNO
        =============================== */}
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
