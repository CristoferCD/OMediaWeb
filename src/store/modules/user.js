import Repository from '../../js/repositories/RepositoryFactory'
const UserRepo = Repository.get("user")

const state = {
    loggedIn: false
}

const getters = {
    isLoggedIn: (state) => {
        return state.loggedIn
    }
}

const actions = {
    login: async ({ commit }, userForm) => {
        const success = await UserRepo.login(userForm)
        commit('loginState', success)
    },
    signup: async ({ dispatch }, userForm) => {
        const success = await UserRepo.signup(userForm)
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