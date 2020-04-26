import client from './clients/AxiosClient'
const resource = '/shows'

export default {
    async get(imdbId) {
        return client.get(`${resource}/${imdbId}`)
    },

    async list() {
        return client.get(`${resource}`)
    },

    async listFollowing() {
        return client.get(`${resource}/following`)
    },

    async follow(imdbId, doFollow) {
        return client.post(`${resource}/${imdbId}/follow`, null, {
            params: {
                value: doFollow
            }
        })
    },

    async register(imdbId) {
        return client.post(`${resource}`, null, {
            params: {
                imdbId: imdbId
            }
        })
    },

    async search(query) {
        return client.get(`${resource}/search`, {
            params: {
                query: query
            }
        })
    }
}