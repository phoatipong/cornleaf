export const state = () => ({
  userId: '',
  displayName: '',
  email: '',
  logined: false,
})

export const mutations = {
  setProfile(state, val) {
    state.userId = val.userId
    state.displayName = val.displayName
    state.email = val.email
  },
  setLogined(state, val) {
    state.logined = val
  },
}
