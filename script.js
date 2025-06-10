// === Lista de siluetas ===
const siluetas = [
  "Acestrorhamphidae.png", "Achiridae.png", "Anostomidae.png", "Apteronotidae.png",
  "Astroblepidae.png", "Astroblepus dux.png", "Belonidae.png", "Bryconidae.png",
  "Callichthyidae.png", "Cetopsidae.png", "Characidae.png", "Cichlidae.png",
  "Crenuchidae.png", "Ctenoluciidae.png", "Curimatidae.png", "Cynodontidae.png",
  "Cyprinodontidae.png", "Eleotridae.png", "Engraulidae.png", "Erythrinidae.png",
  "Gasteropelecidae.png", "Iguanodectidae.png", "Loricariidae.png", "Osteoglossidae.png",
  "Parodontidae.png", "Pimelodidae.png", "Poeciliidae.png", "Potamotrygonidae.png",
  "Pristigasteridae.png", "Prochilodontidae.png", "Pseudopimelodidae.png", "Sciaenidae.png",
  "Serrasalmidae.png", "Sternopygidae.png", "Stevardiidae.png", "Synbranchidae.png",
  "Tetraodontidae.png", "Trichomycteridae.png", "Triportheidae.png"
];

let siluetasRestantes = [...siluetas];
let intervalo;
let girando = false;
let imagenActual = null;

const carpeta = "siluetas/";
const imagenDiv = document.getElementById("imagen-silueta");
const historialLista = document.getElementById("historial-lista");
const imagenesPrecargadas = {};

// === Precarga de imágenes ===
window.addEventListener("load", () => {
  siluetas.forEach(nombre => {
    const img = new Image();
    img.src = carpeta + nombre;
    imagenesPrecargadas[nombre] = img;
  });
});

// === Botón Iniciar ===
document.getElementById("iniciar").addEventListener("click", () => {
  if (girando) return;

  if (siluetasRestantes.length === 0) {
    mostrarMensajeFinal();
    return;
  }

  girando = true;
  intervalo = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * siluetasRestantes.length);
    imagenActual = siluetasRestantes[randomIndex];
    mostrarImagen(imagenActual, "...");
  }, 100);
});

// === Botón Parar ===
document.getElementById("parar").addEventListener("click", () => {
  if (!girando) return;

  clearInterval(intervalo);
  girando = false;

  mostrarImagen(imagenActual, formatearNombre(imagenActual));

  const yaExiste = [...historialLista.children].some(
    li => li.textContent === formatearNombre(imagenActual)
  );

  if (!yaExiste) {
    const li = document.createElement("li");
    li.textContent = formatearNombre(imagenActual);
    historialLista.appendChild(li);
  }

  // Eliminar imagen seleccionada para evitar repeticiones
  siluetasRestantes = siluetasRestantes.filter(nombre => nombre !== imagenActual);
});

// === Mostrar imagen y texto ===
function mostrarImagen(nombre, texto) {
  const img = imagenesPrecargadas[nombre];
  imagenDiv.innerHTML = "";

  if (img) {
    const contenedor = document.createElement("div");
    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "column";
    contenedor.style.alignItems = "center";

    const imagenClonada = img.cloneNode(true);
    imagenClonada.style.maxWidth = "100%";
    imagenClonada.style.height = "auto";
    contenedor.appendChild(imagenClonada);

    const caption = document.createElement("div");
    caption.style.marginTop = "0.5rem";
    caption.style.textAlign = "center";
    caption.innerHTML = `<strong>${texto}</strong>`;

    contenedor.appendChild(caption);
    imagenDiv.appendChild(contenedor);
  }
}

// === Mostrar mensaje final en el contenedor principal ===
function mostrarMensajeFinal() {
  imagenDiv.innerHTML = `
    <div style="color: #b30000; font-weight: bold; font-size: 1.3rem; text-align: center;">
      ⚠️ Ya no quedan siluetas disponibles.<br>Por favor, actualiza la página para reiniciar el juego.
    </div>
  `;
}

// === Formatear nombre de archivo ===
function formatearNombre(nombre) {
  return nombre.replace(".png", "").replace(/_/g, " ").toUpperCase();
}
