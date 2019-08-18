import omdb from '../../js/omdb'

const state = {
    currentlyPlaying: {}
}

const getters = {
    getSource: (state) => {
        return state.currentlyPlaying.src
    }
}

const actions = {
    loadVideo: async ({ commit }, episode) => {
        omdb.loadVideo(episode.fileId).then(src => {
            episode.src = src
            commit('setCurrentlyPlaying', episode)            
        })
    },
    loadNext: async ({ dispatch, state, rootState }) => {
        const currentEpisode = state.currentlyPlaying
        let nextEpisode = rootState.showDetails.episodeList
            .find(ep => ep.season === currentEpisode.season &&
                ep.episodeNumber === currentEpisode.episodeNumber + 1)
        if (nextEpisode === undefined) {
            nextEpisode = rootState.showDetails.episodeList
                .find(ep => ep.season === currentEpisode.season + 1 && ep.episodeNumber === 1)
        } 
        if (nextEpisode != undefined && nextEpisode.fileId != undefined) {
            dispatch('loadVideo', nextEpisode)
        }
    }
}

const mutations = {
    setCurrentlyPlaying: (state, episode) => {
        state.currentlyPlaying = episode
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}