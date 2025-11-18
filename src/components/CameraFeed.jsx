// ============================================================
// 🎥 COMPONENTE: CameraFeed.jsx
// ------------------------------------------------------------
// Responsable de:
//  - Inicializar la cámara del usuario
//  - Ejecutar MediaPipe FaceMesh con detección en tiempo real
//  - Enviar resultados al componente padre mediante onResults()
//  - Detener la cámara y liberar recursos al desmontar
// ============================================================

import React, { useRef, useEffect } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const CameraFeed = ({ onResults }) => {
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const faceMeshRef = useRef(null);

  // ============================================================
  // ⚙️ 1. Inicialización de MediaPipe + Cámara
  // ============================================================
  useEffect(() => {
    if (!videoRef.current) return;

    // ▸ Carga del modelo FaceMesh desde CDN (ligero y eficiente)
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    // ------------------------------------------------------------
    // 🧠 Configuración del modelo
    // ------------------------------------------------------------
    faceMesh.setOptions({
      maxNumFaces: 1,               // Detectar solo 1 rostro
      refineLandmarks: true,        // Más precisión sin costo significativo
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    // ------------------------------------------------------------
    // 📤 Callback de resultados
    // ------------------------------------------------------------
    faceMesh.onResults((results) => {
      if (
        results.multiFaceLandmarks &&
        results.multiFaceLandmarks.length > 0
      ) {
        // Enviamos únicamente las landmarks del primer rostro detectado
        onResults(results.multiFaceLandmarks[0]);
      }
    });

    // ============================================================
    // 📷 2. Inicialización de la cámara
    // ============================================================
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        const video = videoRef.current;
        // Asegurar que el frame es válido y listo antes de procesar
        if (video && video.readyState === 4) {
          await faceMesh.send({ image: video });
        }
      },
      width: 640,
      height: 480,
    });

    camera.start(); // ▶️ Inicio del streaming

    // Guardamos referencias para poder detenerlo después
    cameraRef.current = camera;
    faceMeshRef.current = faceMesh;

    // ============================================================
    // 🧹 3. Cleanup – Liberación de recursos
    // ============================================================
    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();    // Detener cámara
        cameraRef.current = null;
      }
      if (faceMeshRef.current) {
        faceMeshRef.current.close(); // Detener modelo
        faceMeshRef.current = null;
      }
    };
  }, []);

  // ============================================================
  // 🎬 4. Render: elemento de video invisible
  // ------------------------------------------------------------
  // El procesamiento es local: no se guarda ni transmite video.
  // ============================================================
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{ display: "none" }} // No se muestra al usuario
    />
  );
};

export default CameraFeed;
