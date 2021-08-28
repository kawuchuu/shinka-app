import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from './views/Dashboard'
import Servers from './views/Servers'
import ServerView from './views/ServerView'

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
            path: '/server',
            component: ServerView,
            name: 'Server View'
        }
    ]
})

export default router