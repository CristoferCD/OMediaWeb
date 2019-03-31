<template>
  <div id="app">
    <ShowList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ShowList from './components/ShowList.vue'

export default {
  name: 'app',
  components: {
    ShowList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
