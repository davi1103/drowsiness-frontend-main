// ============================================================
// 📄 PÁGINA: PrivacidadYSeguridad.jsx
// ============================================================
// Muestra información transparente sobre cómo SomnoLive protege
// la privacidad, seguridad y confidencialidad del usuario.
// Cumple con el requisito de Aviso de Privacidad y Política de Seguridad.
// ============================================================

import React from "react";
import { Link } from "react-router-dom";

export default function PrivacidadYSeguridad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          🔐 Aviso de Privacidad y Política de Seguridad
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            1. Finalidad del procesamiento
          </h2>
          <p className="text-sm leading-relaxed">
            El sistema <strong>SomnoLive</strong> utiliza la cámara del usuario
            únicamente para analizar rasgos faciales (parpadeos, bostezos,
            microsueños) con el fin de detectar signos de somnolencia.
            <br />
            ⚠️ En ningún momento se graban, almacenan o comparten imágenes ni
            videos. Solo se registran métricas estadísticas anónimas.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            2. Principios de Privacidad
          </h2>
          <ul className="list-disc ml-6 text-sm space-y-2">
            <li><b>Consentimiento informado:</b> antes de activar la cámara, el usuario aprueba expresamente su uso.</li>
            <li><b>Minimización:</b> solo se solicitan datos estrictamente necesarios (usuario y contraseña).</li>
            <li><b>Anonimización:</b> las métricas de detección no se vinculan con información personal.</li>
            <li><b>Transparencia:</b> el usuario puede consultar esta política en cualquier momento.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            3. Seguridad de la Información
          </h2>
          <ul className="list-disc ml-6 text-sm space-y-2">
            <li>Las contraseñas se almacenan cifradas con <b>bcrypt</b>.</li>
            <li>La autenticación se gestiona mediante <b>tokens JWT</b> con expiración automática.</li>
            <li>La comunicación entre cliente y servidor se realiza por <b>HTTPS</b>.</li>
            <li>Las variables sensibles (claves, URLs, tokens) se manejan mediante <b>variables de entorno</b>.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            4. Derechos del Usuario
          </h2>
          <p className="text-sm leading-relaxed">
            El usuario puede solicitar en cualquier momento la eliminación de su
            cuenta y de los registros asociados a su sesión de monitoreo. SomnoLive
            no comercializa ni transfiere información personal a terceros.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            5. Contacto y responsabilidad
          </h2>
          <p className="text-sm">
            Para cualquier consulta o solicitud relacionada con la protección de datos,
            puede contactarse con el administrador del sistema en:
            <br />
            <a href="mailto:somno.privacy@upao.edu.pe" className="text-blue-700 underline">
              somnolive@gmail.com
            </a>
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
