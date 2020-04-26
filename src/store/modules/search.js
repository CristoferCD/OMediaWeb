import Repository from '../../js/repositories/RepositoryFactory'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

const ShowRepo = Repository.get("show")

const state = {
    shows: [],
    loading: false
}

const getters = {
    getShows: (state) => {
        return state.shows
    },
    isLoading: (state) => {
        return state.loading
    }
}

const actions = {
    search: async ({ commit }, query) => {
        commit('setLoading', true)
        ShowRepo.search(query)
            .then((res) => {
                commit('setShows', res.data.data )
            })
            .catch((err) => {
                commit('setShows', { value: [] })
                Snackbar.open({
                    message: err,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            })
            .then(() => {
                commit('setLoading', false)
            })
    }
}

const mutations = {
    setShows: (state, data) => {
        state.shows = data
    },
    setLoading(state, loading) {
        state.loading = loading
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}