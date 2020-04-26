import Repository from '../../js/repositories/RepositoryFactory'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

const ShowRepo = Repository.get("show")

const state = {
    loadedShows: []
}

const getters = {
    getAllShows: (state) => {
        return state.loadedShows
    }
}

const actions = {
    loadAllShows: async ({ commit }) => {
        ShowRepo.list()
            .then((res) => {
                commit('setLoadedShows', { value: res.data })
            })
            .catch((err) => {
                commit('setLoadedShows', { value: [] })
                Snackbar.open({
                    message: err,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            })
    },
    loadFollowing: async ({ commit }) => {
        ShowRepo.listFollowing()
            .then((res) => {
                commit('setLoadedShows', { value: res.data })
            }).catch((err) => {
                commit('setLoadedShows', { value: [] })
                Snackbar.open({
                    message: err,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            })
    },
    follow: async (state, imdbId) => {
        ShowRepo.follow(imdbId, true)
    },
    add: async ({dispatch}, imdbId) => {
        ShowRepo.register(imdbId)
        dispatch('loadAllShows')
    }
}

const mutations = {
    setLoadedShows: (state, { value }) => {
        state.loadedShows = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}