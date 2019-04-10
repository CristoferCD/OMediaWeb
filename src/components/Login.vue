<template>
  <section class="hero is-fullheight">
    <div id="login-box" class="box">
      <b-field label="Username">
        <b-input v-model="name"/>
      </b-field>
      <b-field label="Password">
        <b-input type="password" v-model="pass" password-reveal/>
      </b-field>
      <p class="control has-text-centered">
        <button class="button is-primary">Login</button>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      pass: ""
    };
  }
};
</script>

<style scoped>
section {
    background: lightgray;
}
#login-box {
    margin: auto;
    width: 60vw;
    text-align: left;
}
</style>
