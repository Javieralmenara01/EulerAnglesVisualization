# **Visualización de Ángulos de Euler y Bloqueo Gimbal**  

**Trabajo Final de la Asignatura Robótica Computacional**  
**Grado en Ingeniería Informática**  
**Universidad de La Laguna**  

![GitHub repo size](https://img.shields.io/github/repo-size/Javieralmenara01/EulerAnglesVisualization)  
![GitHub contributors](https://img.shields.io/github/contributors/Javieralmenara01/EulerAnglesVisualization)  
![GitHub last commit](https://img.shields.io/github/last-commit/Javieralmenara01/EulerAnglesVisualization)  

---

## **Descripción del Proyecto**  

El presente proyecto forma parte del **Trabajo Final de la asignatura Robótica Computacional** en el Grado de Ingeniería Informática de la **Universidad de La Laguna**. Su objetivo principal es demostrar de forma interactiva el fenómeno conocido como **Bloqueo Gimbal (Gimbal Lock)**, utilizando gráficos 3D y controles precisos sobre los ángulos de rotación.  

La herramienta permite visualizar en tiempo real cómo la interacción entre los ángulos de Euler afecta las rotaciones en el espacio tridimensional, y cómo determinadas configuraciones conducen a la pérdida de un grado de libertad.  

---

## **Tecnologías Utilizadas**  

- **Lenguaje Principal:** TypeScript  
- **Bibliotecas:**  
   - **THREE.js:** Visualización y manipulación de objetos 3D.  
   - **React:** Creación de la interfaz de usuario interactiva.  
   - **dat.GUI:** Interfaz gráfica para la manipulación de parámetros en tiempo real.  
- **Entorno de Desarrollo:** Node.js  
- **Renderizado Gráfico:** WebGL  

---

## **Estructura del Proyecto**  

```plaintext
├── public/                # Archivos públicos
│   ├── index.html         # Archivo principal HTML
│
├── src/                   # Código fuente
│   ├── components/        
│   │   └── ExactGimbalVisualizer.tsx  # Componente principal de visualización
│   ├── utils/             
│   │   └── mathUtils.ts   # Utilidades matemáticas para Euler y Cuaterniones
│   ├── index.tsx          # Punto de entrada de la aplicación React
│
├── .gitignore             # Archivos ignorados por Git
├── package.json           # Dependencias y scripts del proyecto
├── tsconfig.json          # Configuración de TypeScript
├── webpack.config.js      # Configuración de Webpack
└── README.md              # Documentación principal
```

## **Componentes Principales**  

### **1. mathUtils.ts**  

Ubicación: **/src/utils/mathUtils.ts**  

Este archivo contiene funciones matemáticas esenciales para las conversiones y manipulaciones de ángulos:  

- **eulerToQuaternion:** Convierte ángulos de Euler a Cuaterniones.  
- **quaternionToEuler:** Convierte Cuaterniones a ángulos de Euler.  
- **normalizeAngle:** Normaliza un ángulo entre 0 y 2π.  
- **angleDifference:** Calcula la diferencia angular entre dos ángulos.  
- **isGimbalLock:** Determina si ha ocurrido un bloqueo Gimbal.  

---

### **2. ExactGimbalVisualizer.tsx**  

Ubicación: **/src/components/ExactGimbalVisualizer.tsx**  

Componente React encargado de:  

- Crear una **escena 3D interactiva** con THREE.js.  
- Integrar un **sistema Gimbal con tres anillos rotatorios** (ejes X, Y, Z).  
- Renderizar un **cubo interactivo** para visualizar los efectos del bloqueo.  
- Proporcionar **controles GUI** para ajustar los ángulos X, Y, Z de forma precisa.  
- Adaptarse dinámicamente al **tamaño de la ventana**.  

---

### **3. index.html**  

Ubicación: **/public/index.html**  

- Define el punto de entrada para la aplicación web.  
- Garantiza que la interfaz cubra toda la pantalla.  

---

### **4. index.tsx**  

Ubicación: **/src/index.tsx**  

- Renderiza el componente principal **ExactGimbalVisualizer** en el DOM.  
- Utiliza **React.StrictMode** para garantizar buenas prácticas de desarrollo.  

---

## **Autor**  

**Javier Almenara Herrera**  
- *alu0101466552@ull.edu.es*
- [GitHub](https://github.com/Javieralmenara01)  

---

## **Contribuir**  

Si deseas contribuir:  
1. Realiza un **Fork** del repositorio.  
2. Crea una rama con tus cambios:  
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus modificaciones y haz un commit:  
   ```bash
   git commit -m "Añadida nueva funcionalidad"
   ```
4. Envía un **Pull Request**.  

---

## **Licencia**  

Este proyecto está licenciado bajo la **MIT License**. Consulta el archivo [LICENSE](LICENSE) para más detalles.  

```
