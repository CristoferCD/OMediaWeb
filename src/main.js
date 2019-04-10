import Vue from 'vue/dist/vue.esm.js'
import Router from 'vue-router'
import App from './App.vue'
import VideoPlayer from './components/VideoPlayer.vue'
import Login from './components/Login.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Buefy)

const router = new Router({
  routes: [
    {
      path: "/",
      component: App
    },
    {
      path: "/video/:id",
      component: VideoPlayer
    },
    {
      path: "/login",
      component: Login
    }
  ]
})

new Vue({
  router
}).$mount('#app')
