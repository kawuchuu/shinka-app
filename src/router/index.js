import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from './views/Dashboard'
import Servers from './views/Servers'

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
        }
    ]
})

export default router