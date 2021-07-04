import Vuex from 'vuex'
import Vue from 'vue'
import yt from './modules/yt'

Vue.use(Vuex)

console.log(yt)

const store = new Vuex.Store({
    modules: {
        yt
    }
})

export default store