<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <router-link to="/">
          <img src="@/assets/logo.png">
        </router-link>
      </div>
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
        <div class="navbar-item">
          <router-link to="/following">Following</router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/discover">Discover</router-link>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link to="/login" class="button is-primary">
            <i class="fas fa-user"/>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.navbar {
  background: #eaeaea;
  box-shadow: 0px -10px 20px black;
}
</style>
