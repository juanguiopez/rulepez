import streamlit as st
import random
import os
import time
from PIL import Image
import base64

# === CONFIGURACIÓN GENERAL ===
st.set_page_config(page_title="La RulePez", layout="centered", page_icon="🎣")

# === FUNCION PARA CONVERTIR IMAGEN A BASE64 ===
def imagen_base64(path):
    with open(path, "rb") as img:
        data = img.read()
    return base64.b64encode(data).decode()

# === RUTAS RELATIVAS (válidas tanto local como en Streamlit Cloud) ===
ruta_base = os.path.abspath(os.path.dirname(__file__))
dir_imgs = os.path.join(ruta_base, "siluetas")
img_fondo_path = os.path.join(ruta_base, "fondo", "fondo_transparente.png")
img_b64 = imagen_base64(img_fondo_path)

# === ESTILOS CSS CON FONDO TRANSPARENTE AL 50% ===
st.markdown(f"""
    <style>
        html, body, .stApp {{
            background-color: white !important;
            background-image: url("data:image/png;base64,{img_b64}");
            background-repeat: repeat;
            background-size: 800px;
            background-attachment: fixed;
        }}
        .stApp::before {{
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url("data:image/png;base64,{img_b64}");
            background-repeat: repeat;
            background-size: 800px;
            opacity: 0.5;
            z-index: -1;
        }}
        .block-container {{
            padding-top: 1rem;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            padding: 2rem;
        }}
        .stButton > button {{
            border: 1px solid #999;
            margin: 0.5rem;
        }}
    </style>
""", unsafe_allow_html=True)

# === TÍTULO ===
st.markdown("<h1 style='color:black;'>La RulePez</h1>", unsafe_allow_html=True)
st.markdown("<p style='color:black;'>Haz clic en el botón para iniciar el giro. Luego presiona 'Parar Ruleta' para detenerla y mostrar la silueta seleccionada.</p>", unsafe_allow_html=True)

# === INICIALIZAR ESTADOS ===
if "girando" not in st.session_state:
    st.session_state["girando"] = False

if "seleccionado" not in st.session_state:
    st.session_state["seleccionado"] = None

if "historial" not in st.session_state:
    st.session_state["historial"] = []

# === CONTENEDOR DE IMAGEN ===
contenedor_img = st.empty()

# === FUNCIONES ===

def formatear_nombre(nombre_archivo):
    nombre = os.path.splitext(nombre_archivo)[0]
    return nombre.replace("_", " ").capitalize()

@st.cache_resource
def cargar_imagenes():
    nombres = []
    imagenes = []
    for nombre in sorted(os.listdir(dir_imgs)):
        if nombre.endswith(".png"):
            ruta = os.path.join(dir_imgs, nombre)
            try:
                img = Image.open(ruta).convert("RGBA")
                nombres.append(nombre)
                imagenes.append(img)
            except:
                pass
    return nombres, imagenes

def iniciar_giro():
    st.session_state["girando"] = True
    st.session_state["seleccionado"] = None

    nombres, imagenes = cargar_imagenes()
    total = len(imagenes)

    # Mostrar una imagen al azar como "giro visual"
    idx_giro = random.randint(0, total - 1)
    contenedor_img.image(imagenes[idx_giro], width=600, caption="...")

    time.sleep(1)  # Simula el giro

    if st.session_state["girando"]:
        idx_final = random.randint(0, total - 1)
        st.session_state["seleccionado"] = nombres[idx_final]
        mostrar_silueta()

def detener_giro():
    st.session_state["girando"] = False

def mostrar_silueta():
    nombre = st.session_state["seleccionado"]
    if nombre:
        if nombre not in st.session_state["historial"]:
            st.session_state["historial"].append(nombre)

        ruta = os.path.join(dir_imgs, nombre)
        imagen = Image.open(ruta)
        st.subheader("🎣 Silueta Seleccionada:")
        contenedor_img.image(imagen, width=500, caption=formatear_nombre(nombre))

# === INTERFAZ DE BOTONES ===
col1, col2 = st.columns([1, 1])

with col1:
    if st.button("🎯 Iniciar Ruleta"):
        iniciar_giro()

with col2:
    if st.button("🛑 Parar Ruleta"):
        detener_giro()

# === MOSTRAR RESULTADO SI YA HAY SELECCIÓN ===
if st.session_state["seleccionado"] and not st.session_state["girando"]:
    mostrar_silueta()

# === MOSTRAR HISTORIAL DE SILUETAS ===
if st.session_state["historial"]:
    st.markdown("### 📜 Historial de Siluetas:")
    for silueta in st.session_state["historial"]:
        st.write("• " + formatear_nombre(silueta))
