import omdb from '../../js/omdb'

const state = {
    loadedShows: []
}

const getters = {
    getAllShows: (state) => {
        return state.loadedShows
    }
}

const actions = {
    loadAllShows: async ({commit}) => {
        const showList = await omdb.getShows()
        commit('setLoadedShows', {value: showList})
    }
}

const mutations = {
    setLoadedShows: (state, {value}) => {
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