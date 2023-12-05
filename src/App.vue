<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <b-navbar toggleable="lg" type="dark" variant="secondary">
    <b-container>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="a-link" href="#">
            <router-link to="/">Listar Registros</router-link>
          </b-nav-item>
          <b-nav-item class="a-link" href="#">
            <router-link to="/crear_registro">Crear registro</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>

  <b-container>
    <RouterView />
  </b-container>
</template>

<style scoped>
  a {
    text-decoration: none;
    margin-right: 1rem;
    color: #fafafa;
  }
  a:hover {
    color: #c8c8c8;
  }
</style>
