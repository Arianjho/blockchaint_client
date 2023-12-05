<script setup>
import { ref, onMounted } from "vue";
import { conection } from "../conection/conn";

const registros = ref([]);
const loading = ref(true);

function descargarArchivo(nombreArchivo) {
  const archivos = JSON.parse(localStorage.getItem("archivos") || "{}");
  const archivoDataUrl = archivos[nombreArchivo];
  if (!archivoDataUrl) {
    alert("Archivo no encontrado.");
    return;
  }

  // Crea un enlace y descarga el archivo
  const link = document.createElement("a");
  link.href = archivoDataUrl;
  link.setAttribute("download", nombreArchivo);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // No olvides limpiar el DOM
}

async function listarRegistros() {
  try {
    const total = await conection.contrato.methods.totalRegistros().call();
    let tempRegistros = [];

    for (let i = 0; i < total; i++) {
      let registro = await conection.contrato.methods.obtenerRegistro(i).call();
      tempRegistros.push(registro);
    }

    registros.value = tempRegistros;
    loading.value = false;
  } catch (error) {
    console.error("Error al listar registros:", error);
  }
}

onMounted(() => {
  listarRegistros();
});
</script>

<template>
  <main>
    <h2 class="h2">Listado de Registros</h2>
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Archivo</th>
        </tr>
      </thead>
      <tbody v-if="registros.length > 0">
        <tr v-for="(registro, index) in registros" :key="index">
          <td>{{ registro.id }}</td>
          <td>{{ registro.nombre }}</td>
          <td>{{ registro.categoria }}</td>
          <td>
            <button
              class="btn btn-primary"
              @click="descargarArchivo(registro.urlArchivo)"
            >
              Descargar archivo
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="loading">
        <tr>
          <td class="text-center" colspan="4">Cargando...</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center" colspan="4">No hay registros.</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.text-center {
  text-align: center;
}
.thead {
  background-color: #000;
}
.h2 {
  margin: 1rem 0;
}
</style>
