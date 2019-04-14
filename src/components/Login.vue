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
        <button class="button is-primary" @click="login">Login</button>
      </p>
    </div>
  </section>
</template>

<script>
import { login } from "../js/omdb";

export default {

  data() {
    return {
      name: "",
      pass: ""
    };
  },
  methods: {
    login: function() {
      login(this.name, this.pass)
      this.$router.push('/')
    }
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
