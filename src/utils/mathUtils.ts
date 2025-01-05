import * as THREE from 'three';

/**
 * Convierte ángulos de Euler a un Cuaternión.
 * @param euler Angulos de Euler en radianes (X, Y, Z)
 * @returns Cuaternión resultante
 */
export const eulerToQuaternion = (euler: THREE.Euler): THREE.Quaternion => {
  const quaternion = new THREE.Quaternion();
  quaternion.setFromEuler(euler);
  return quaternion;
};

/**
 * Convierte un Cuaternión a ángulos de Euler.
 * @param quaternion Cuaternión a convertir
 * @returns Ángulos de Euler resultantes
 */
export const quaternionToEuler = (quaternion: THREE.Quaternion): THREE.Euler => {
  const euler = new THREE.Euler();
  euler.setFromQuaternion(quaternion);
  return euler;
};

/**
 * Normaliza un ángulo en radianes entre 0 y 2π.
 * @param angle Ángulo en radianes
 * @returns Ángulo normalizado
 */
export const normalizeAngle = (angle: number): number => {
  return ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
};

/**
 * Calcula la diferencia angular entre dos ángulos.
 * @param angle1 Primer ángulo en radianes
 * @param angle2 Segundo ángulo en radianes
 * @returns Diferencia angular
 */
export const angleDifference = (angle1: number, angle2: number): number => {
  let diff = angle2 - angle1;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  while (diff < -Math.PI) diff += 2 * Math.PI;
  return diff;
};

/**
 * Determina si se ha producido un bloqueo Gimbal.
 * @param euler Ángulos de Euler
 * @returns Booleano indicando si hay bloqueo Gimbal
 */
export const isGimbalLock = (euler: THREE.Euler): boolean => {
  const threshold = 0.001; // Margen de error pequeño
  return (
    Math.abs(Math.abs(euler.x) - Math.PI / 2) < threshold ||
    Math.abs(Math.abs(euler.y) - Math.PI / 2) < threshold
  );
};
