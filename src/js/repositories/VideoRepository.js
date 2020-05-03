import client from './clients/AxiosClient'

export default {
    async loadVideo(id) {
        return client.get("/files/" + id)
            .then((res) => {
                return process.env.VUE_APP_API_URL + "/video/" + res.data
            })
    },

    uploadFile(file, episodeData, updateProgress) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('showId', episodeData.showId)
        formData.append('season', episodeData.seasonNumber)
        formData.append('episode', episodeData.episodeNumber)

        client.post('/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: updateProgress
        })
    }
}