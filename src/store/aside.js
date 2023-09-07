export default {
  state: {
    rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]')
  },
  mutations: {
    setRightList(state, data) {
      state.rightList = data
      sessionStorage.setItem('rightList', JSON.stringify(data))
    }
  },

  actions: {}
}
