import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  defs,
} from "recharts";

export default function ProbabilidadChart({ data }) {
  const parsedData = data.map((item) => {
    const fecha = new Date(item.tiempo);
    const horaExacta =
      fecha.getHours().toString().padStart(2, "0") +
      ":" +
      fecha.getMinutes().toString().padStart(2, "0");

    return {
      tiempo: horaExacta,
      probabilidad: item.valor,
    };
  });

  return (
    <div className="rounded-xl shadow-md p-4 bg-white border border-blue-100">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">
        Evolución de la probabilidad durante la sesión
      </h3>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={parsedData}>
          <defs>
            <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0.1} />
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
            labelStyle={{ color: "#64748b", fontWeight: "bold" }}
            formatter={(value) => [`${value}%`, "Probabilidad"]}
          />

          <Line
            type="monotone"
            dataKey="probabilidad"
            stroke="url(#colorProb)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#2563eb" }}
            animationDuration={700}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
