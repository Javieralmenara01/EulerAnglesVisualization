import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GUI } from 'dat.gui';

const ExactGimbalVisualizer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 🎯 Escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x202020);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 0, 5);

    // 🎯 Crear Gimbal
    const gimbal = new THREE.Object3D();
    const gimbalX = new THREE.Object3D();
    const gimbalY = new THREE.Object3D();
    const gimbalZ = new THREE.Object3D();

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial()
    );

    // Crear anillos del Gimbal con colores
    const ringMaterialX = new THREE.MeshBasicMaterial({
      color: 0xff0000, // Rojo
      wireframe: true,
    });
    const ringMaterialY = new THREE.MeshBasicMaterial({
      color: 0x00ff00, // Verde
      wireframe: true,
    });
    const ringMaterialZ = new THREE.MeshBasicMaterial({
      color: 0x0000ff, // Azul
      wireframe: true,
    });

    const ringX = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.05, 16, 100),
      ringMaterialX
    );
    ringX.rotation.y = Math.PI / 2;

    const ringY = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.05, 16, 100),
      ringMaterialY
    );

    const ringZ = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.05, 16, 100),
      ringMaterialZ
    );
    ringZ.rotation.x = Math.PI / 2;

    gimbalX.add(ringX);
    gimbalX.add(gimbalY);
    gimbalY.add(ringY);
    gimbalY.add(gimbalZ);
    gimbalZ.add(ringZ);
    gimbalZ.add(cube);

    gimbal.add(gimbalX);
    scene.add(gimbal);

    // 🎛️ Controles GUI (exactos del repositorio)
    const gui = new GUI();
    const controls = {
      angleX: 0,
      angleY: 0,
      angleZ: 0,
    };

    gui.add(controls, 'angleX', -180, 180, 1).name('Ángulo X (°)');
    gui.add(controls, 'angleY', -180, 180, 1).name('Ángulo Y (°)');
    gui.add(controls, 'angleZ', -180, 180, 1).name('Ángulo Z (°)');

    // 🎥 Animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Aplicar rotaciones exactas
      gimbalX.rotation.x = THREE.MathUtils.degToRad(controls.angleX);
      gimbalY.rotation.y = THREE.MathUtils.degToRad(controls.angleY);
      gimbalZ.rotation.z = THREE.MathUtils.degToRad(controls.angleZ);

      renderer.render(scene, camera);
    };
    animate();

    // 📏 Ajustar la ventana
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // 🧹 Cleanup
    return () => {
      gui.destroy();
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default ExactGimbalVisualizer;
