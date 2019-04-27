export const baseUrl = "http://192.168.0.16:7890"

export function getHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.authToken
    }
}

export function login(username, password) {
    fetch(baseUrl + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": username,
            "password": password
        })
    }).then(res => res.json())
    .then(response => {
        localStorage.setItem("authToken", response.token)
    })
}

export async function getShows() {
    const response = await fetch(baseUrl + "/shows", {
        method: "GET",
        headers: getHeaders()
    })
    return await response.json()
}

export async function registerShow(imdbId) {
    await fetch(baseUrl + "/shows?imdbId=" + imdbId, {
        method: "POST",
        headers: getHeaders()
    })
}

export async function getEpisodes(showId) {
    const response = await fetch(baseUrl + "/episodes?show="+showId, {
        method: "GET",
        headers: getHeaders()
    })
    return await response.json()
}

export async function loadVideo(id) {
    const response = await fetch(baseUrl + "/files/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/octet-stream",
            "Authorization": "Bearer " + localStorage.authToken
        }
    })
    var token = await response.text()
    return baseUrl + "/video/" + token
}

export function uploadFile(file, showId, seasonNumber, episodeNumber) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('showId', showId)
    formData.append('season', seasonNumber)
    formData.append('episode', episodeNumber)

    fetch(baseUrl + "/files", {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": "Bearer " + localStorage.authToken
        }
    })
}