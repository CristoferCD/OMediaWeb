export const baseUrl = process.env.VUE_APP_API_URL

export default {
    getHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken
        }
    },

    login(username, password) {
        return fetch(baseUrl + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": username,
                "password": password
            })
        }).then(res => res.json().then(data => ({ status: res.status, body: data })))
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem("authToken", response.body.token)
                    return true
                } else {
                    localStorage.removeItem("authToken")
                    return false
                }
            })
    },

    signup(username, password) {
        fetch(baseUrl + "/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": username,
                "password": password
            })
        }).then(res => res.json().then(data => ({ status: res.status, body: data })))
            .then(response => {
                if (response.status === 200) {
                    return true
                } else {
                    return false
                }
            })
    },

    async getShows() {
        const response = await fetch(baseUrl + "/shows", {
            method: "GET",
            headers: this.getHeaders()
        })
        const value = await response.json()
        if (response.status === 200) {
            return value
        } else {
            throw value.message
        }
    },

    async getFollowingShows() {
        const response = await fetch(baseUrl + "/shows/following", {
            method: "GET",
            headers: this.getHeaders()
        })
        const value = await response.json()
        if (response.status === 200) {
            return value
        } else {
            throw value.message
        }
    },

    async follow(imdbId, doFollow) {
        await fetch(baseUrl + "/shows/" + imdbId + "/follow?value=" + doFollow, {
            method: "POST",
            headers: this.getHeaders()
        })
    },

    async registerShow(imdbId) {
        await fetch(baseUrl + "/shows?imdbId=" + imdbId, {
            method: "POST",
            headers: this.getHeaders()
        })
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
    },

    async search(query) {
        const response = await fetch(baseUrl + "/shows/search?query=" + query, {
            method: "GET",
            headers: this.getHeaders()
        })
        return await response.json()
    }
}