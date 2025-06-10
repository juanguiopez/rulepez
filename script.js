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
const mensajeFinal = document.getElementById("mensaje-final");
const imagenesPrecargadas = {};

// === Precargar imágenes ===
window.addEventListener("load", () => {
  siluetas.forEach(nombre => {
    const img = new Image();
    img.src = carpeta + nombre;
    imagenesPrecargadas[nombre] = img;
  });
});

// === Iniciar ruleta ===
document.getElementById("iniciar").addEventListener("click", () => {
  if (girando || siluetasRestantes.length === 0) return;

  mensajeFinal.style.display = "none";
  girando = true;

  intervalo = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * siluetasRestantes.length);
    imagenActual = siluetasRestantes[randomIndex];
    mostrarImagen(imagenActual, "...");
  }, 100);
});

// === Detener ruleta ===
document.getElementById("parar").addEventListener("click", () => {
  if (!girando) return;

  clearInterval(intervalo);
  girando = false;

  mostrarImagen(imagenActual, formatearNombre(imagenActual));

  if (![...historialLista.children].some(li => li.textContent === formatearNombre(imagenActual))) {
    const li = document.createElement("li");
    li.textContent = formatearNombre(imagenActual);
    historialLista.appendChild(li);
  }

  siluetasRestantes = siluetasRestantes.filter(nombre => nombre !== imagenActual);

  if (siluetasRestantes.length === 0) {
    mensajeFinal.style.display = "block";
  }
});

// === Mostrar imagen y nombre ===
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

// === Formatear nombre de archivo ===
function formatearNombre(nombre) {
  return nombre.replace(".png", "").replace(/_/g, " ").toUpperCase();
}
