<template>
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
</template>

<script>
export default {

}
</script>

<style>
.navbar {
    background: #eaeaea;
    box-shadow: 0px -10px 20px black;
}
</style>
