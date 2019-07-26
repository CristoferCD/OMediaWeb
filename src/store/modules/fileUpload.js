import omdb from '../../js/omdb'

const state = {
    uploadProgress: [],
    progressListeners: []
}

const getters = {
    getUploadProgress: state => episodeId => {
        const prog = state.uploadProgress.find(it => it.id === episodeId)
        if (prog !== undefined) {
            return prog.progress
        } else {
            return 0
        }
    }
}

const actions = {
    uploadFile: async ({state, commit}, {file, showId, episode}) => {
        omdb.uploadFile(file, showId, episode.season, episode.number, state.progressListeners[episode.id])
    }
}

const mutations = {
    updateProgress: (state, {episodeId, progress}) => {
        state.uploadProgress.find(it => it.id === episodeId).progress = progress
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}