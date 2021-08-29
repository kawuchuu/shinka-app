import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from './views/Dashboard'
import Servers from './views/Servers'
import ServerView from './views/ServerView'
import AudioPlayerControl from './views/AudioPlayerControl'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Dashboard,
            name: 'Dashboard',
            alias: '/dash'
        },
        {
            path: '/servers',
            component: Servers,
            name: 'Servers'
        },
        {
            path: '/servers/:id',
            component: ServerView,
            name: 'Server View'
        },
        {
            path: '/servers/:id/audiocontrol',
            component: AudioPlayerControl,
            name: 'Audio Player Control'
        }
    ]
})

export default router