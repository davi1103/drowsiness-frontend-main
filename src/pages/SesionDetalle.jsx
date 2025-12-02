import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSesionPorId } from "../shared/api";
import ProbabilidadChartDetalle from "../components/ProbabilidadChartDetalle";
import { FaClock, FaEye, FaBed } from "react-icons/fa";

export default function SesionDetalle() {
  const { id } = useParams();
  const [sesion, setSesion] = useState(null);

  useEffect(() => {
    getSesionPorId(id).then(setSesion);
  }, [id]);

  if (!sesion) return <div className="p-6">Cargando sesión...</div>;

  // ======================================================
  // 1️⃣ AGRUPAR PARPADEOS / BOSTEZOS / MICROSUEÑOS POR MINUTO
  // ======================================================
  const eventosPorMinuto = {};

  sesion.eventos.forEach((ev) => {
    const minuto = new Date(ev.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (!eventosPorMinuto[minuto]) {
      eventosPorMinuto[minuto] = {
        parpadeos: 0,
        bostezos: 0,
        microsuenos: 0,
      };
    }

    if (ev.tipo === "parpadeo") eventosPorMinuto[minuto].parpadeos++;
    if (ev.tipo === "bostezo") eventosPorMinuto[minuto].bostezos++;
    if (ev.tipo.includes("microsueño"))
      eventosPorMinuto[minuto].microsuenos++;
  });

  // ======================================================
  // 2️⃣ EVENTOS RELEVANTES (bostezos, microsueños, ráfagas, cambios bruscos)
  // ======================================================

  const eventosRelevantes = [];

  sesion.eventos.forEach((ev, index) => {
    const hora = new Date(ev.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // BOSTEZOS
    if (ev.tipo === "bostezo") {
      eventosRelevantes.push({
        icono: "😴",
        tipo: "Bostezo detectado",
        hora,
        prob: ev.probabilidad,
      });
    }

    // MICROSUEÑOS
    if (ev.tipo.includes("microsueño")) {
      eventosRelevantes.push({
        icono: ev.tipo.includes("crítico") ? "⛔" : "🔶",
        tipo: ev.tipo,
        hora,
        prob: ev.probabilidad,
      });
    }

    // RÁFAGA DE PARPADEOS — 3 parpadeos en ≤ 5 seg
    if (ev.tipo === "parpadeo" && index >= 2) {
      const t1 = new Date(sesion.eventos[index - 2].timestamp);
      const t2 = new Date(ev.timestamp);
      if ((t2 - t1) / 1000 <= 5) {
        eventosRelevantes.push({
          icono: "👁️‍🗨️",
          tipo: "Ráfaga de parpadeos",
          hora,
          prob: ev.probabilidad,
        });
      }
    }

    // CAMBIOS BRUSCOS (≥ 20% diferencia)
    if (index > 0) {
      const prev = sesion.eventos[index - 1].probabilidad;
      const actual = ev.probabilidad;

      if (Math.abs(actual - prev) >= 20) {
        eventosRelevantes.push({
          icono: actual > prev ? "📈" : "📉",
          tipo:
            actual > prev
              ? "Aumento brusco del nivel de somnolencia"
              : "Disminución brusca del nivel de somnolencia",
          hora,
          prob: actual,
        });
      }
    }
  });

  return (
    <div className="min-h-screen flex bg-white">

      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-[#0a0f3c] text-white flex flex-col justify-between items-center p-6 sticky top-0 h-screen">
        <div className="flex flex-col items-center flex-1 text-center">
          <h1 className="text-2xl font-extrabold mb-3">Detalle de sesión</h1>
          <p className="text-sm text-blue-100">
            Revisa todos los eventos detectados durante esta sesión.
          </p>
        </div>

        <Link to="/registros">
          <button className="bg-white text-blue-900 px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition">
            ← Volver a registros
          </button>
        </Link>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-6">

          {/* Encabezado */}
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Sesión del {new Date(sesion.fechaInicio).toLocaleString()}
          </h2>

          {/* Información general */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-gray-800">
            <p><strong>Duración:</strong> {Math.round(sesion.duracion / 60)} min</p>
            <p><strong>Probabilidad máxima:</strong> {sesion.nivelMax ?? "—"}%</p>
            <p><strong>Total eventos:</strong> {sesion.eventos.length}</p>
          </div>

          {/* LEYENDA */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 text-sm text-blue-900">
            <strong>Leyenda de eventos:</strong>
            <p>👁️‍🗨️ Ráfaga de parpadeos (varios en poco tiempo)</p>
            <p>😴 Bostezo detectado</p>
            <p>🔶 Microsueño moderado</p>
            <p>⛔ Microsueño crítico</p>
            <p>📈/📉 Cambios bruscos del nivel de somnolencia</p>
          </div>

          {/* GRÁFICO */}
          <ProbabilidadChartDetalle eventos={sesion.eventos} />

          {/* TABLA DE EVENTOS RELEVANTES */}
          <h3 className="text-xl font-bold text-blue-900 mt-8 mb-2">Eventos relevantes</h3>
          <div className="rounded-lg border overflow-hidden shadow">
            <table className="w-full text-sm text-gray-800">
              <thead className="bg-red-100 text-red-700 font-semibold">
                <tr>
                  <th className="px-4 py-2">Evento</th>
                  <th className="px-4 py-2">Hora</th>
                  <th className="px-4 py-2">Probabilidad</th>
                </tr>
              </thead>
              <tbody>
                {eventosRelevantes.map((ev, i) => (
                  <tr key={i} className="even:bg-gray-50 border-b">
                    <td className="px-4 py-2 flex gap-2 items-center">
                      {ev.icono} {ev.tipo}
                    </td>
                    <td className="px-4 py-2">{ev.hora}</td>
                    <td className="px-4 py-2 font-semibold">{ev.prob}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLA AGRUPADA POR MINUTO */}
          <h3 className="text-xl font-bold text-blue-900 mt-10 mb-2">Eventos por minuto</h3>

          <div className="rounded-lg border overflow-hidden shadow">
            <table className="w-full text-sm text-gray-800">
              <thead className="bg-blue-50 text-blue-900 font-semibold">
                <tr>
                  <th className="px-4 py-2">Minuto</th>
                  <th className="px-4 py-2">Parpadeos</th>
                  <th className="px-4 py-2">Bostezos</th>
                  <th className="px-4 py-2">Microsueños</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(eventosPorMinuto).map(([min, vals], i) => (
                  <tr key={i} className="even:bg-gray-50 border-b">
                    <td className="px-4 py-2 font-mono">{min}</td>
                    <td className="px-4 py-2">{vals.parpadeos}</td>
                    <td className="px-4 py-2">{vals.bostezos}</td>
                    <td className="px-4 py-2">{vals.microsuenos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
