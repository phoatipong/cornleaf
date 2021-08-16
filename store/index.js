export const state = () => ({
  userId: '',
  displayName: '',
  email: '',
})


export const mutations = {
    setProfile(state,val){
        state.userId = val.userId
        state.displayName = val.displayName
        state.email = val.email
    }
}