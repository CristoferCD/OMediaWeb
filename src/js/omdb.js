let baseUrl = "http://192.168.0.16:7890"

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
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken
        }
    })
    return await response.json()
}

export async function registerShow(imdbId) {
    await fetch(baseUrl + "/shows?imdbId=" + imdbId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken
        }
    })
}

export async function getEpisodes(showId) {
    const response = await fetch(baseUrl + "/episodes?show="+showId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.authToken
        }
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