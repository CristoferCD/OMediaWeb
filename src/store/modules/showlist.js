import omdb from '../../js/omdb'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

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
        try {
            const showList = await omdb.getShows()
            commit('setLoadedShows', { value: showList })
        } catch (err) {
            Snackbar.open({
                message: err,
                position: 'is-bottom',
                type: 'is-danger'
            })
        }
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