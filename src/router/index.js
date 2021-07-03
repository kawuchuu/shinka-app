import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from './views/Dashboard'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Dashboard,
            name: 'Dashboard',
            alias: '/dash'
        }
    ]
})

export default router