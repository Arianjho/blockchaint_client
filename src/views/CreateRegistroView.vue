<script setup>
import { ref } from "vue";
import { conection } from "../conection/conn";

const nombre = ref("");
const categoria = ref("");
const urlArchivo = ref("");

const success = ref(false);
const errorMensaje = ref(""); // Agrega una referencia para almacenar mensajes de error

async function getAccount() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
}

async function crearRegistro() {
  const cuenta = await getAccount();
  try {
    // Estimar el gas necesario para la transacción y convertirlo a una cadena si es un BigInt
    const estimatedGas = await conection.contrato.methods
      .crearRegistro(nombre.value, categoria.value, urlArchivo.value)
      .estimateGas({ from: cuenta });
    const estimatedGasString =
      typeof estimatedGas === "bigint" ? estimatedGas.toString() : estimatedGas;

    // Añadir un margen de error al gas estimado
    const gasLimit = Math.floor(Number(estimatedGasString) * 1.2);

    // Enviar la transacción con el gas estimado
    await conection.contrato.methods
      .crearRegistro(nombre.value, categoria.value, urlArchivo.value)
      .send({ from: cuenta, gas: gasLimit.toString() });

    nombre.value = "";
    categoria.value = "";
    urlArchivo.value = "";
    success.value = true;
    errorMensaje.value = ""; // Limpia el mensaje de error sFi la transacción es exitosa
  } catch (error) {
    console.error("Error al crear el registro:", error);
    errorMensaje.value = error.message; // Almacena el mensaje de error para mostrarlo en la UI
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
          v-model="urlArchivo"
          type="text"
          class="form-control"
          id="inputarchivo"
          placeholder="Ingrese el nombre del archivo"
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
