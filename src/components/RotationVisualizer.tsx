import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GUI } from 'dat.gui';

const RotationVisualizer: React.FC = () => {
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
    renderer.setClearColor(0x202020); // Fondo gris oscuro
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // 🎯 Crear Gimbal
    const gimbalOuter = new THREE.Object3D();
    const gimbalMiddle = new THREE.Object3D();
    const gimbalInner = new THREE.Object3D();
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshNormalMaterial()
    );

    // Crear anillos para los gimbals
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.05, 16, 100),
      ringMaterial
    );
    outerRing.rotation.x = Math.PI / 2;

    const middleRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.05, 16, 100),
      ringMaterial
    );

    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.05, 16, 100),
      ringMaterial
    );
    innerRing.rotation.y = Math.PI / 2;

    gimbalOuter.add(outerRing);
    gimbalOuter.add(gimbalMiddle);
    gimbalMiddle.add(middleRing);
    gimbalMiddle.add(gimbalInner);
    gimbalInner.add(innerRing);
    gimbalInner.add(cube);

    scene.add(gimbalOuter);

    // 🎛️ GUI: Controladores en Grados
    const gui = new GUI();
    const gimbalRotation = {
      rotationX: 0, // en grados
      rotationY: 0,
      rotationZ: 0,
    };

    gui.add(gimbalRotation, 'rotationX', -180, 180, 1).name('Rotación X (°)');
    gui.add(gimbalRotation, 'rotationY', -180, 180, 1).name('Rotación Y (°)');
    gui.add(gimbalRotation, 'rotationZ', -180, 180, 1).name('Rotación Z (°)');

    // 🎥 Animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Convertir grados a radianes
      gimbalOuter.rotation.x = THREE.MathUtils.degToRad(gimbalRotation.rotationX);
      gimbalMiddle.rotation.y = THREE.MathUtils.degToRad(gimbalRotation.rotationY);
      gimbalInner.rotation.z = THREE.MathUtils.degToRad(gimbalRotation.rotationZ);

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

export default RotationVisualizer;
