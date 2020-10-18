import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      uid: '',
      displayName: '',
      email: ''
    }
  },
  mutations: {
    setUser (state, value) {
      Object.assign(state.user, {
        uid: value.uid,
        displayName: value.displayName,
        email: value.email
      })
    }
  },
  getters: {
    getUser: state => state.user
  },
  actions: {
  },
  modules: {
  }
})
