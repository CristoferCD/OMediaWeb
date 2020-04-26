export const baseUrl = process.env.VUE_APP_API_URL

export default {
    getHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken
        }
    },

    async getEpisodes(showId) {
        const response = await fetch(baseUrl + "/episodes?show=" + showId, {
            method: "GET",
            headers: this.getHeaders()
        })
        return await response.json()
    },

    async setSeen(videoId, seen) {
        const response = await fetch(baseUrl + "/episodes/" + videoId + "/seen?value=" + seen, {
            method: "POST",
            headers: this.getHeaders()
        })
        return await response.json()
    },

    async loadVideo(id) {
        const response = await fetch(baseUrl + "/files/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/octet-stream",
                "Authorization": "Bearer " + localStorage.authToken
            }
        })
        var token = await response.text()
        return baseUrl + "/video/" + token
    },

    uploadFile(file, showId, seasonNumber, episodeNumber, updateProgress) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('showId', showId)
        formData.append('season', seasonNumber)
        formData.append('episode', episodeNumber)

        var request = new XMLHttpRequest();
        request.upload.addEventListener("progress", updateProgress);
        request.open("POST", baseUrl + "/files");
        request.setRequestHeader("Authorization", "Bearer " + localStorage.authToken)
        request.send(formData);
    }
}