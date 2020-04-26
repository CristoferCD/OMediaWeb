import Repository from '../../js/repositories/RepositoryFactory'

const ShowRepo = Repository.get("show")
const EpisodeRepo = Repository.get("episode")

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
    initShow: async ({ commit, rootState }, { imdbId }) => {
        let show = rootState.showlist.loadedShows.find(s => s.imdbId === imdbId)
        if (show === undefined) {
            const res = await ShowRepo.get(imdbId)
            show = res.data
        }
        commit('setShow', show)

        EpisodeRepo.list(show.imdbId)
            .then((res) => {
                commit('setEpisodes', res.data)

                let seasons = []
                for (const ep of res.data) {
                    if (!seasons.includes(ep.season)) {
                        seasons.push(ep.season);
                    }
                }
                commit('setSeasons', seasons)
            })
    },
    setSeen: async ({ commit }, { episodeId, seen }) => {
        EpisodeRepo.setSeen(episodeId, seen)
            .then(() => {
                commit('setEpisodeSeen', {
                    episodeId: episodeId,
                    seen: seen
                })
            })
    }
}

const mutations = {
    setShow: (state, show) => {
        state.show = show
    },
    setEpisodes: (state, episodes) => {
        state.episodeList = episodes
    },
    setSeasons: (state, seasons) => {
        state.seasonList = seasons
        var lastSeen = seasons[0]
        for (var i = state.episodeList.length - 1; i >= 0; i -= 1) {
            if (state.episodeList[i].seen === true) {
                lastSeen = state.episodeList[i].season
            }
        }
        state.selectedSeason = lastSeen
    },
    selectSeason: (state, idx) => {
        state.selectedSeason = idx
    },
    setEpisodeSeen: (state, { episodeId, seen }) => {
        state.episodeList.find(ep => ep.id === episodeId).seen = seen
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}