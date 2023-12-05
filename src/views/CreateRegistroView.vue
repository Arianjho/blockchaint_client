<script setup>
import { ref } from "vue";
import { conection } from "../conection/conn";

const nombre = ref("");
const categoria = ref("");
const archivo = ref(null); // Referencia al archivo

const success = ref(false);
const errorMensaje = ref("");

// Maneja la carga del archivo
function handleFileUpload(event) {
  archivo.value = event.target.files[0];
}

// Obtén la cuenta de Ethereum
async function getAccount() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
}

// Crea el registro
async function crearRegistro() {
  const cuenta = await getAccount();
  if (!archivo.value) {
    errorMensaje.value = "Por favor, selecciona un archivo para subir.";
    return;
  }
  const nombreArchivo = archivo.value.name; // Usa el nombre del archivo directamente

  try {
    const estimatedGas = await conection.contrato.methods
      .crearRegistro(nombre.value, categoria.value, nombreArchivo)
      .estimateGas({ from: cuenta });

    const gasLimit = Math.floor(Number(estimatedGas) * 1.2);

    await conection.contrato.methods
      .crearRegistro(nombre.value, categoria.value, nombreArchivo)
      .send({ from: cuenta, gas: gasLimit.toString() });

    // Guarda el archivo en localStorage
    const reader = new FileReader();
    reader.onload = function (e) {
      const archivos = JSON.parse(localStorage.getItem("archivos") || "{}");
      archivos[nombreArchivo] = e.target.result; // Guarda el contenido del archivo
      localStorage.setItem("archivos", JSON.stringify(archivos));
    };
    reader.readAsDataURL(archivo.value); // Lee el archivo como Data URL

    nombre.value = "";
    categoria.value = "";
    archivo.value = null;
    success.value = true;
    errorMensaje.value = "";
  } catch (error) {
    console.error("Error al crear el registro:", error);
    errorMensaje.value = error.message;
    success.value = false;
  }
}
</script>

<template>
  <main>
    <h2 class="h2">Crear Registro</h2>
    <form @submit.prevent="crearRegistro">
      <div class="form-group mb-3">
        <label class="mb-1" for="nombreinput">Nombre:</label>
        <input
          v-model="nombre"
          type="text"
          class="form-control"
          id="nombreinput"
          placeholder="Ingrese el nombre"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label class="mb-1" for="inputcategoria">Categoria:</label>
        <input
          v-model="categoria"
          type="text"
          class="form-control"
          id="inputcategoria"
          placeholder="Ingrese la categoria"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label class="mb-1" for="inputarchivo">Archivo:</label>
        <input
          type="file"
          class="form-control"
          id="inputarchivo"
          placeholder="Ingrese el nombre del archivo"
          @change="handleFileUpload"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Guardar Registro</button>
    </form>
    <p class="text" v-if="success">Registro creado exitosamente.</p>
    <p class="text" v-if="errorMensaje">{{ errorMensaje }}</p>
  </main>
</template>

<style scoped>
.h2 {
  margin: 1rem 0;
}
.text {
  margin: 0.5rem 0;
}
</style>
