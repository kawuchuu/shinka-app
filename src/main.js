import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import store from './store'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:64342',
  withCredentials: true,
  vuex: {
    store,

  }
}))

new Vue({
  router,
  store,
  sockets: {
    connect: () => {
      console.log('connected to socket.io')
    },
    ytPlayerUpdate: (data) => {
      store.commit('yt/updatePlayer', data)
    },
    ytPlayerMetadata: data => {
      store.commit('yt/updateMetadata', data)
    },
    presenceUpdate: data => {
      console.log(data)
    }
  },
  render: h => h(App),
}).$mount('#app')

router.replace({ path: '/' })