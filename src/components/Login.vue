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
        <button class="button is-primary" @click="login({name: name, pass: pass})">Login</button>
        <button class="button is-primary" @click="signup({name: name, pass: pass})">Signup</button>
      </p>
    </div>
  </section>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      name: "",
      pass: ""
    };
  },
  methods: mapActions('user', ['login', 'signup'])
};
</script>

<style scoped>
section {
    background: lightgray;
}
#login-box {
    margin: 15% auto;
    width: 60vw;
    text-align: left;
    padding: 1.25rem !important;
}
</style>
