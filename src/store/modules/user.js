import omdb from '../../js/omdb'

const state = {
    loggedIn: false
}

const getters = {
    isLoggedIn: (state) => {
        return state.loggedIn
    }
}

const actions = {
    login: ({ commit }, userForm) => {
        const logSuccessful = omdb.login(userForm.name, userForm.pass)
        commit('loginState', logSuccessful)
    },
    signup: ({ dispatch }, userForm) => {
        const success = omdb.signup(userForm.name, userForm.pass)
        if (success) {
            dispatch('login', userForm)
        }
    }
}

const mutations = {
    loginState: (state, { value }) => {
        state.loggedIn = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}