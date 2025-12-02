import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ProbabilidadChartDetalle({ eventos }) {
  if (!eventos || eventos.length === 0) return null;

  // 1️⃣ Convertimos eventos en datos con hora exacta
  const rawData = eventos
    .filter((e) => typeof e.probabilidad === "number")
    .map((e) => {
      const fecha = new Date(e.timestamp);
      const hora =
        fecha.getHours().toString().padStart(2, "0") +
        ":" +
        fecha.getMinutes().toString().padStart(2, "0");

      return { tiempo: hora, probabilidad: e.probabilidad };
    });

  // 2️⃣ Filtramos para quedarnos solo con valores que cambian
  const dataFiltrada = rawData.filter((item, idx, array) => {
    if (idx === 0) return true; // siempre mostrar el primero
    return item.probabilidad !== array[idx - 1].probabilidad;
  });

  return (
    <div className="mt-8 rounded-xl p-4 bg-white shadow-md border border-blue-100">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">
        Evolución de la probabilidad durante la sesión
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={dataFiltrada}>
          <defs>
            <linearGradient id="detalleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

          <XAxis
            dataKey="tiempo"
            tick={{ fontSize: 12, fill: "#475569" }}
            interval="preserveStartEnd"
          />

          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: "#475569" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              padding: "6px 10px",
            }}
            formatter={(value) => [`${value}%`, "Probabilidad"]}
          />

          <Line
            type="monotone"
            dataKey="probabilidad"
            stroke="url(#detalleGrad)"
            strokeWidth={3}
            dot={{ r: 5, fill: "#2563eb" }}
            activeDot={{ r: 8, fill: "#1d4ed8" }}
            animationDuration={700}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
