import omdb from '../../js/omdb'

const state = {
    show: {},
    episodeList: [],
    seasonList: [],
    selectedSeason: 0
}

const getters = {
    getShow: (state) => {
        return state.show
    },
    getEpisodes: (state) => {
        return state.episodeList.filter(ep => ep.season === state.selectedSeason)
    },
    getSeasonIdxList: (state) => {
        return state.seasonList
    },
    getSelectedSeason: (state) => {
        return state.selectedSeason
    }
}

const actions = {
    initShow: async ({ commit, rootState }, {imdbId}) => {
        const show = rootState.showlist.loadedShows.find(s => s.imdbId === imdbId)
        commit('setShow', { show: show })

        const episodes = await omdb.getEpisodes(show.imdbId)
        commit('setEpisodes', { episodes: episodes })

        let seasons = []
        for (const ep of episodes) {
            if (!seasons.includes(ep.season)) {
                seasons.push(ep.season);
            }
        }
        commit('setSeasons', {seasons: seasons})
    }
}

const mutations = {
    setShow: (state, { show }) => {
        state.show = show
    },
    setEpisodes: (state, { episodes }) => {
        state.episodeList = episodes
    },
    setSeasons: (state, { seasons }) => {
        state.seasonList = seasons
        var lastSeen = seasons[0]
        for (var i = state.episodeList.length - 1; i >= 0; i-=1) {
            if (state.episodeList[i].seen === true) {
                lastSeen = state.episodeList[i].season
            }
        }
        state.selectedSeason = lastSeen
    },
    selectSeason: (state, {idx}) => {
        state.selectedSeason = idx
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}