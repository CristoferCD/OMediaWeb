import user from './modules/user'
import showlist from './modules/showlist'
import showDetails from './modules/showDetails'
import fileUpload from './modules/fileUpload'
import videoPlayer from './modules/videoPlayer'
import search from './modules/search'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        showlist,
        showDetails,
        fileUpload,
        videoPlayer,
        search
    }
})