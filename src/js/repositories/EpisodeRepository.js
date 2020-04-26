import client from './clients/AxiosClient'
const resource = '/episodes'

export default {
    async list(showId) {
        return client.get(`${resource}`, {
            params: {
                show: showId
            }
        })
    },

    async setSeen(videoId, seen) {
        return client.post(`${resource}/${videoId}/seen`, null, {
            params: {
                value: seen
            }
        })
    }
}