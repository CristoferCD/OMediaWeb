import Repository from '../../js/repositories/RepositoryFactory'
import {srt2webvtt} from '../../js/helpers/srtconverter'

const VideoRepo = Repository.get('video')
const EpisodeRepo = Repository.get('episode')

const state = {
    currentlyPlaying: {},
    availableSubtitles: [],
    selectedSubtitle: {},
    loadingSubtitles: false
}

const getters = {
    getSource: (state) => {
        return state.currentlyPlaying.src
    },
    getAvailableSubtitles: (state) => {
        return state.availableSubtitles
    },
    isLoadingSubtitles: (state) => {
        return state.loadingSubtitles
    },
    getSubtitle: (state) => {
        return state.selectedSubtitle
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
    },
    listSubtitles: async ({ commit, state }) => {
        if (state.currentlyPlaying !== undefined) {
            commit('setLoadingSubtitles', true)
            EpisodeRepo.listSubtitles(state.currentlyPlaying.id)
                .then((res) => {
                    commit('setAvailableSubtitles', res.data)
                    commit('setLoadingSubtitles', false)
                })
        }
    },
    getSubtitle: async ({ commit }, subtitle) => {
        EpisodeRepo.getSubtitle(subtitle.origin, subtitle.url)
            .then((res) => {
                commit('setSelectedSubtitle', {
                    label: subtitle.title,
                    src: URL.createObjectURL(new Blob([srt2webvtt(res.data)], { type: "text/plain" }))
                })
            })
    }
}

const mutations = {
    setCurrentlyPlaying: (state, episode) => {
        state.currentlyPlaying = episode
    },
    setAvailableSubtitles: (state, subtitles) => {
        state.availableSubtitles = subtitles
    },
    setSelectedSubtitle: (state, srt) => {
        state.selectedSubtitle = srt
    },
    setLoadingSubtitles: (state, loading) => {
        state.loadingSubtitles = loading
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}