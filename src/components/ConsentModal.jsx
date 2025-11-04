// ============================================================
// 📄 COMPONENTE: ConsentModal.jsx
// ============================================================
// Este componente muestra un cuadro de diálogo modal que solicita
// el consentimiento informado del usuario antes de activar la cámara.
//
// 🔹 Cumple los requisitos del Anexo de Privacidad (Ley 29733 / GDPR)
//    y del Anexo de Seguridad (ISO 27001 - control de consentimiento).
//
// 🔐 No se almacena el consentimiento en base de datos, 
//     solo se usa para permitir el uso de la cámara en la sesión actual.
// ============================================================

import React from "react";

export default function ConsentModal({ onAccept, onReject }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md text-center">
        {/* 🧠 Título principal */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          🧠 Consentimiento para el uso de la cámara
        </h2>

        {/* 📘 Mensaje informativo */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          El sistema <strong>SomnoLive</strong> analizará tu rostro en tiempo real
          con fines de <strong>detección de somnolencia</strong> mediante IA,
          evaluando <strong>parpadeos, bostezos y microsueños</strong>.
        </p>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          🔒 <strong>No se graban ni almacenan imágenes ni videos</strong>.
          Solo se registran métricas estadísticas anónimas para tu sesión actual.
        </p>

        <p className="text-xs text-gray-500 mb-6">
          Al presionar <b>“Aceptar y continuar”</b>, confirmas haber leído y
          comprendido el propósito del análisis visual, autorizando el uso
          temporal de la cámara durante esta sesión.
        </p>

        {/* 🧩 Botones de acción */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onReject}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onAccept}
            className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-semibold"
          >
            Aceptar y continuar
          </button>
        </div>
      </div>
    </div>
  );
}
