import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomePage from '../views/HomePage.vue'
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import Admin from "../views/Admin.vue"
import TableUser from "../views/TableUser.vue"

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/homepage',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: "/signin",
        name: "signin",
        component: SignIn,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUp,
    },
    {
        path: "/admin",
        name: "admin",
        component: Admin,
    },
    {
        path: "/tableuser",
        name: "tableuser",
        component: TableUser,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router