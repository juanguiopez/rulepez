const siluetasIniciales = [
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

let siluetasDisponibles = [...siluetasIniciales]; // Siluetas que aún no han salido
let intervalo;
let girando = false;
let imagenActual = null;

const carpeta = "siluetas/";
const imagenDiv = document.getElementById("imagen-silueta");
const historialLista = document.getElementById("historial-lista");

document.getElementById("iniciar").addEventListener("click", () => {
  if (girando || siluetasDisponibles.length === 0) return;

  girando = true;
  intervalo = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * siluetasDisponibles.length);
    imagenActual = siluetasDisponibles[randomIndex];
    mostrarImagen(imagenActual, "...");
  }, 100);
});

document.getElementById("parar").addEventListener("click", () => {
  if (!girando || !imagenActual) return;

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

  // Eliminar la silueta mostrada de la lista para que no se repita
  siluetasDisponibles = siluetasDisponibles.filter(s => s !== imagenActual);

  // Opcional: mensaje si ya no hay más
  if (siluetasDisponibles.length === 0) {
    alert("🎉 ¡Has descubierto todas las siluetas!");
  }
});

function mostrarImagen(nombre, texto) {
  imagenDiv.innerHTML = `
    <div class="imagen-contenedor">
      <img src="${carpeta + nombre}" alt="${nombre}" />
      <div class="nombre-silueta"><strong>${texto}</strong></div>
    </div>
  `;
}

function formatearNombre(nombre) {
  return nombre.replace(".png", "").replace(/_/g, " ").toUpperCase();
}
