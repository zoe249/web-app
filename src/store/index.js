import Vue from 'vue'
import Vuex from 'vuex'
// import aside from './aside'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]')
  },
  mutations: {
    setRightList(state, data) {
      state.rightList = data
      sessionStorage.setItem('rightList', JSON.stringify(data))
    }
  },
  actions: {},
  modules: {
    // aside
  }
})
