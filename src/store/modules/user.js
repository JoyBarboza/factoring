import httpService from '@/shared/httpService'

const state = {
  userType: null,
  address: null
}

const getters = {
  userType: (state) => { return state.userType },
  address: (state) => { return state.address },
  token: (state) => { return state.token },
  user: (state) => { return state.user }
}

const mutations = {
  setUserType: function(state, userType) {
    state.userType = userType
  },
  setAddress: function(state, address) {
    state.address = address
  },
  setToken: function (state, token) {
    state.token = token
  },
  setUser: function (state, user) {
    state.user = user
  }
}

const actions = {
  signup: function (context, [user, opts]) {
    return new Promise((resolve, reject) => {
      httpService.post('/register', user, opts).then(resp => {
        user = resp
        context.commit('setToken', user.access_token)
        context.commit('setUser', user)
        resolve(resp)
      }, error => {
        reject(error.response.data)
      })
    })
  },
  signin: function (context, [user, opts]) {
    return new Promise((resolve, reject) => {
      httpService.post('/login', user, opts).then(resp => {
        user = resp
        context.commit('setToken', user.access_token)
        context.commit('setUser', user)
        resolve(resp)
      }, error => {
        reject(error.response.data)
      })
    })
  },
  logoutUser: function (context) {
    context.commit('setToken', null)
    context.commit('setUser', null)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}