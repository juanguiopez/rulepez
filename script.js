const siluetas = [
  "Acestrorhamphidae.png",
  "Achiridae.png",
  "Anostomidae.png",
  "Apteronotidae.png",
  "Astroblepidae.png",
  "Astroblepus dux.png",
  "Belonidae.png",
  "Bryconidae.png",
  "Callichthyidae.png",
  "Cetopsidae.png",
  "Characidae.png",
  "Cichlidae.png",
  "Crenuchidae.png",
  "Ctenoluciidae.png",
  "Curimatidae.png",
  "Cynodontidae.png",
  "Cyprinodontidae.png",
  "Eleotridae.png",
  "Engraulidae.png",
  "Erythrinidae.png",
  "Gasteropelecidae.png",
  "Iguanodectidae.png",
  "Loricariidae.png",
  "Osteoglossidae.png",
  "Parodontidae.png",
  "Pimelodidae.png",
  "Poeciliidae.png",
  "Potamotrygonidae.png",
  "Pristigasteridae.png",
  "Prochilodontidae.png",
  "Pseudopimelodidae.png",
  "Sciaenidae.png",
  "Serrasalmidae.png",
  "Sternopygidae.png",
  "Stevardiidae.png",
  "Synbranchidae.png",
  "Tetraodontidae.png",
  "Trichomycteridae.png",
  "Triportheidae.png"
];

const carpeta = "siluetas/";
const imagenDiv = document.getElementById("imagen-silueta");
const historialLista = document.getElementById("historial-lista");

let imagenesPrecargadas = {};
let intervalo;
let girando = false;
let imagenActual = null;

// === Precargar todas las imágenes al inicio ===
window.addEventListener("load", () => {
  siluetas.forEach(nombre => {
    const img = new Image();
    img.src = carpeta + nombre;
    imagenesPrecargadas[nombre] = img;
  });
});

document.getElementById("iniciar").addEventListener("click", () => {
  if (girando || siluetas.length === 0) return;

  girando = true;
  intervalo = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * siluetas.length);
    imagenActual = siluetas[randomIndex];
    mostrarImagen(imagenActual, "...");
  }, 100);
});

document.getElementById("parar").addEventListener("click", () => {
  if (!girando) return;

  clearInterval(intervalo);
  girando = false;

  mostrarImagen(imagenActual, formatearNombre(imagenActual));

  const yaExiste = [...historialLista.children].some(li => li.textContent === formatearNombre(imagenActual));
  if (!yaExiste) {
    const li = document.createElement("li");
    li.textContent = formatearNombre(imagenActual);
    historialLista.appendChild(li);
  }
});

function mostrarImagen(nombre, texto) {
  const img = imagenesPrecargadas[nombre];
  imagenDiv.innerHTML = "";
  if (img) {
    const contenedor = document.createElement("div");
    contenedor.appendChild(img.cloneNode(true));
    const caption = document.createElement("div");
    caption.innerHTML = `<strong>${texto}</strong>`;
    contenedor.appendChild(caption);
    imagenDiv.appendChild(contenedor);
  }
}

function formatearNombre(nombre) {
  return nombre.replace(".png", "").replace(/_/g, " ").toUpperCase();
}
