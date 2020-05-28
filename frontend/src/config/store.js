import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user: null
        // user:{
        //     name: 'Willian17',
        //     student: true,
        //     id: 1
        // }
    },
    mutations:{
        setUser(state , user){
            state.user = user
            if(user){
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            }else{
                delete axios.defaults.headers.common['Authorization']
            }
        }
    }
})