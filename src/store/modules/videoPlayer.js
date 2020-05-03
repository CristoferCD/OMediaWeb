import Repository from '../../js/repositories/RepositoryFactory'

const VideoRepo = Repository.get('video')

const state = {
    currentlyPlaying: {}
}

const getters = {
    getSource: (state) => {
        return state.currentlyPlaying.src
    }
}

const actions = {
    loadVideo: async ({ commit, dispatch }, episode) => {
        VideoRepo.loadVideo(episode.fileId)
            .then(src => {
                episode.src = src
                dispatch('showDetails/setSeen', {
                    episodeId: episode.id,
                    seen: true
                }, { root: true })
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