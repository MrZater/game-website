export default {
  namespaced: true,
  state: {
    // your state properties go here
    uid: undefined,
  },
  mutations: {
    // your mutation functions go here
    SET_UID(state, uid){
      state.uid = uid
    },
  },
  //   actions: {
  //     // your action functions go here
  //   },
  getters: {
    // your getter functions go here
    getUID: state => state.uid,
  },
}
