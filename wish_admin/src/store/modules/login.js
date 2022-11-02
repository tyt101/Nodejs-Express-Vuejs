export default {
    // namespaced:true,
    state:{
        loginData:{}
    },
    mutations:{
        SET_LOGIN_DATA(state,payload){
            state.loginData = payload
        }
    },
    actions:{
        set_login_data({commit},payload){
            console.log("set_login_data")
            commit('SET_LOGIN_DATA',payload)
        }
    }
}