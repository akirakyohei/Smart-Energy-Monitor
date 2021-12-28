import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomePage from '../views/HomePage.vue'
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import Admin from "../views/Admin.vue"
import TableUser from "../views/TableUser.vue"
import UserTest from "../views/UserTest.vue"
import test from "../views/test.vue"
import AdminPx from "../views/AdminPx.vue"

import UpdateAccount from "../views/UpdateAccount.vue"
import RoleAd from "../views/RoleAd.vue"
import Payment from "../views/Payment.vue"
import AdminCRUD from "../views/AdminCRUD.vue"
import AreaCRUD from "../views/AreaCRUD.vue"
import EpriceCRUD from "../views/EpriceCRUD.vue"
import ManageEmb from "../views/ManageEmb.vue"
import ManageCus from "../views/ManageCus.vue"
import DaboardCus from "../views/DaboardCus.vue"

import Pie from "../views/Pie.vue"
import Line from "../views/Line.vue"
/* import TopNavbar from "../views/TopNavbar.vue"
import ContentFooter from "../views/ContentFooter.vue"
import DashboardContent from "../views/Content.vue"
import MobileMenu from "../views/MobileMenu.vue"
 */

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
        path: "/usertest",
        name: "usertest",
        component: UserTest,
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
        path: "/adminpx",
        name: "adminpx",
        component: AdminPx,
    },

    {
        path: "/tableuser",
        name: "tableuser",
        component: TableUser,
    },
    {
        path: "/test",
        name: "test",
        component: test,
    },
    {
        path: "/updateaccount",
        name: "updateaccount",
        component: UpdateAccount,
    },
    {
        path: "/rolead",
        name: "rolead",
        component: RoleAd,
    },
    {
        path: "/payment",
        name: "payment",
        component: Payment,
    },
    {
        path: "/admincrud",
        name: "admincrud",
        component: AdminCRUD,
    },
    {
        path: "/areacrud",
        name: "areacrud",
        component: AreaCRUD,
    },
    {
        path: "/epricecrud",
        name: "epricecrud",
        component: EpriceCRUD,
    },
    {
        path: "/manageemb",
        name: "manageemb",
        component: ManageEmb,
    },
    {
        path: "/managecus",
        name: "managecus",
        component: ManageCus,
    },
    {
        path: "/daboardcus",
        name: "daboardcus",
        component: DaboardCus,
    },
    {
        path: "/pie",
        name: "pie",
        component: Pie,
    },
    {
        path: "/line",
        name: "line",
        component: Line,
    },
    /*     {
            path: '/content',
            name: 'content',
            component: DashboardContent,
        },
        {
            path: '/topnavbar',
            name: 'topnavbar',
            component: TopNavbar,
        },
        {
            path: '/contentfooter',
            name: 'contentfooter',
            component: ContentFooter,
        },
        {
            path: '/mobilemenu',
            name: 'mobilemenu',
            component: MobileMenu,
        }, */
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