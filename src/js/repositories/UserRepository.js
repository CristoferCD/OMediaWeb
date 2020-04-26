import client from './clients/AxiosClient'

export default {
    async login(form) {
        return client.post("/login", form)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    localStorage.setItem("authToken", res.data.token)
                    return true
                } else {
                    localStorage.removeItem("authToken")
                    return false
                }
            })
    },

    async signup(form) {
        return client.post("/signup", form)
    }
}