// ============================================================
// 📄 PÁGINA: Detection.jsx
// ============================================================


import React, { useState, useEffect } from "react";
import CameraFeed from "../components/CameraFeed";
import { useSomnolencia } from "../hooks/useSomnolencia";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import ProbabilidadChart from "../components/ProbabilidadChart";
import ConsentModal from "../components/ConsentModal";

export default function Detection() {
  // Hooks personalizados: análisis de somnolencia
  const {
    probabilidad,
    analizarLandmarks,
    parpadeos,
    microsuenos,
    bostezos,
    eventos,
    tiempoInicio,
    reiniciarSesion,
    resetHistorial,
    iniciarSesion,
    finalizarSesionBackend,
    sesionId,
    historial,
  } = useSomnolencia();

  // Estados locales
  const [tiempo, setTiempo] = useState("00:00");
  const [alerta, setAlerta] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [consentimiento, setConsentimiento] = useState(false);
  const navigate = useNavigate();

  // ============================================================
  // 🧩 1. Lógica del consentimiento
  // ============================================================

  // Si acepta el uso de la cámara → activa la sesión
  const handleAceptar = async () => {
    setConsentimiento(true);
    await iniciarSesion(); // solo inicia si acepta
  };

  // Si rechaza → vuelve al menú y muestra un mensaje claro
  const handleRechazar = () => {
    alert(
      "⚠️ Has cancelado el uso de la cámara.\nPara iniciar la detección, es necesario otorgar tu consentimiento."
    );
    navigate("/menu");
  };

  // ============================================================
  // ⏱️ 2. Temporizador de la sesión (min:seg)
  // ============================================================
  useEffect(() => {
    if (!tiempoInicio) return;
    const timer = setInterval(() => {
      const delta = Math.floor((Date.now() - tiempoInicio) / 1000);
      const minutos = String(Math.floor(delta / 60)).padStart(2, "0");
      const segundos = String(delta % 60).padStart(2, "0");
      setTiempo(`${minutos}:${segundos}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [tiempoInicio]);

  // ============================================================
  // 🚨 3. Detección de alertas en tiempo real
  // ============================================================
  useEffect(() => {
    const ultimo = eventos[eventos.length - 1];
    if (!ultimo) return;

    if (ultimo.tipo === "microsueño crítico") {
      setAlerta({ tipo: "critico", mensaje: "🔴 ¡Microsueño crítico detectado!" });
    } else if (ultimo.tipo === "microsueño moderado") {
      setAlerta({ tipo: "alto", mensaje: "🟠 Microsueño moderado" });
    } else if (ultimo.tipo === "parpadeos elevados") {
      setAlerta({ tipo: "moderado", mensaje: "🟡 Parpadeos frecuentes" });
    } else if (probabilidad >= 80) {
      setAlerta({ tipo: "critico", mensaje: "🔴 Somnolencia crítica" });
    } else if (probabilidad >= 60) {
      setAlerta({ tipo: "alto", mensaje: "🟠 Somnolencia elevada" });
    } else if (probabilidad >= 40) {
      setAlerta({ tipo: "moderado", mensaje: "🟡 Somnolencia moderada" });
    } else {
      setAlerta(null);
    }
  }, [eventos, probabilidad]);

  // ============================================================
  // 🧹 4. Finalizar sesión y limpiar datos
  // ============================================================
  const detenerSesion = async () => {
    setCargando(true);
    await finalizarSesionBackend(sesionId, eventos);
    reiniciarSesion();
    resetHistorial();
    navigate("/registros");
  };

  // ============================================================
  // 🌀 5. Pantalla de carga al cerrar sesión
  // ============================================================
  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-sky-700">
        <div className="animate-spin h-12 w-12 border-4 border-blue-400 border-t-transparent rounded-full mb-4"></div>
        <p className="text-lg font-semibold">
          Cerrando sesión y limpiando datos...
        </p>
      </div>
    );
  }

  // ============================================================
  // 🎨 6. Render principal con modal y cámara
  // ============================================================
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Modal visible solo si aún no hay consentimiento */}
      {!consentimiento && (
        <ConsentModal onAccept={handleAceptar} onReject={handleRechazar} />
      )}

      {/* Encabezado */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md py-4 px-6">
        <h1 className="text-2xl font-bold text-center">
          Sistema de Monitoreo de Somnolencia
        </h1>
      </header>

      {/* Cuerpo visible solo tras aceptar */}
      {consentimiento && (
        <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col items-center gap-6">
          {/* Alerta en tiempo real */}
          {alerta && <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} />}

          {/* Cámara */}
          {sesionId ? (
            <CameraFeed onResults={analizarLandmarks} />
          ) : (
            <p className="text-gray-500 text-sm mt-4">
              Inicializando cámara...
            </p>
          )}

          {/* Indicador ético de privacidad */}
          <p className="text-xs text-gray-500 italic mt-2">
            🔒 Esta sesión no almacena imágenes ni videos. Solo métricas anónimas.
          </p>

          {/* Barra de nivel de somnolencia */}
          <div className="w-full text-center mt-4">
            <p className="text-lg font-medium">
              Nivel de somnolencia:{" "}
              <strong className="text-sky-800">
                {Math.round(probabilidad)}%
              </strong>
            </p>
            <div className="w-full h-4 bg-gray-200 rounded-full mt-2 overflow-hidden shadow-inner">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${Math.min(probabilidad, 100)}%`,
                  backgroundColor:
                    probabilidad < 40
                      ? "#3b82f6"
                      : probabilidad < 75
                      ? "#facc15"
                      : "#ef4444",
                }}
              ></div>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-4">
            {[{ label: "Parpadeos", value: parpadeos },
              { label: "Microsueños", value: microsuenos },
              { label: "Bostezos", value: bostezos },
              { label: "Tiempo", value: tiempo }].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-sky-500 rounded-lg shadow-md text-center py-3"
                >
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="text-2xl font-bold text-sky-700">
                    {item.label === "Tiempo"
                      ? <span className="font-mono">{item.value}</span>
                      : item.value}
                  </p>
                </div>
              ))}
          </div>

          {/* Gráfico histórico */}
          <div className="w-full mt-6 bg-white border border-blue-300 rounded shadow p-4">
            <h2 className="text-sky-700 font-semibold text-lg mb-2">
              Evolución de la somnolencia
            </h2>
            <ProbabilidadChart data={historial} />
          </div>

          {/* Botón para detener */}
          <button
            onClick={detenerSesion}
            className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded shadow hover:bg-red-700 transition"
          >
            Detener detección
          </button>
        </main>
      )}
    </div>
  );
}
