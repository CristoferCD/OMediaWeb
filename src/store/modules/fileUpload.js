import Vue from 'vue'
import Repository from '../../js/repositories/RepositoryFactory'

const VideoRepo = Repository.get('video')

const state = {
    uploadProgress: {},
    progressListeners: {}
}

const getters = {
    getUploadProgress: state => {
        return state.uploadProgress
    }
}

const actions = {
    uploadFile: async ({commit}, {file, showId, episode}) => {
        commit('updateProgress', {episodeId: episode.id, progress: 0})
        const fun = (evt) => {
            if (evt.lengthComputable) {
              const prog = (evt.loaded / evt.total) * 100;
              commit('updateProgress', {episodeId: episode.id, progress: prog})
            } 
        }
        VideoRepo.uploadFile(file, {
            showId: showId,
            seasonNumber: episode.season,
            episodeNumber: episode.episodeNumber
        }, fun)
    }
}

const mutations = {
    updateProgress: (state, {episodeId, progress}) => {
        Vue.set(state.uploadProgress, episodeId, progress)
    },
    registerProgressListener: (state, {id, fun}) => {
        state.progressListeners[id] = fun
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}