<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a href="/openmediadb" class="navbar-item"></a>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">Home</a>

          <a class="navbar-item">Documentation</a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a href="/openmediadb/login" class="button is-primary">Login</a>
          </div>
        </div>
      </div>
    </nav>

    <ShowList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ShowList from "./components/ShowList.vue";

export default {
  name: "app",
  components: {
    ShowList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
