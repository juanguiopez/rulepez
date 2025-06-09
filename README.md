# 🎣 RulePez

**RulePez** es un juego educativo de ruleta de peces diseñado para promover el conocimiento de la diversidad ictiológica. Desarrollado inicialmente en Python con Streamlit, esta versión fue reconstruida con tecnologías web (HTML, CSS, JavaScript) para ofrecer mayor velocidad y compatibilidad multiplataforma.

---

## 🚀 ¿Qué hace?

- Muestra una ruleta visual que "gira" aleatoriamente entre siluetas de peces.
- Permite iniciar y detener la ruleta con botones interactivos.
- Muestra la silueta seleccionada y la guarda en un historial.
- Funciona sin conexión a servidores ni bases de datos.
- Carga todas las imágenes desde la carpeta local `siluetas`.

---

## 🧱 Estructura del Proyecto

📁 rulepez-html
│
├── index.html # Página principal del juego
├── style.css # Estilos visuales (fondo, botones, animación)
├── script.js # Lógica de la ruleta e interacción
│
├── 📁 fondo
│ └── fondo_transparente.png # Imagen de fondo con transparencia
│
└── 📁 siluetas
├── Acestrorhamphidae.png
├── Achiridae.png
├── ...
└── Triportheidae.png


---

## 📦 Cómo usar

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tuusuario/rulepez-html.git
