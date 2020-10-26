import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      uid: '',
      displayName: '',
      email: '',
      isAnonymous: false
    }
  },
  mutations: {
    setUser (state, value) {
      Object.assign(state.user, {
        uid: value.uid,
        displayName: value.displayName,
        email: value.email,
        isAnonymous: value.isAnonymous
      })

      if (state.user.isAnonymous) state.user.displayName = '게스트'
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
