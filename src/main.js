import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import store from './store/store'
import Home from './components/Home.vue'
import Discover from './components/Discover.vue'
import VideoPlayer from './components/VideoPlayer.vue'
import ShowDetails from './components/ShowDetails'
import Login from './components/Login.vue'
import Following from './components/Following'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VuePlyr from 'vue-plyr'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Buefy)
Vue.use(VuePlyr)

const router = new Router({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/video/:id",
      component: VideoPlayer
    },
    {
      path: "/show/:id",
      component: ShowDetails
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/following",
      component: Following
    },
    {
      path: "/discover",
      component: Discover
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/singup']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('authToken')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
