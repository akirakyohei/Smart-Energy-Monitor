import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import HomePage from "../views/HomePage.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";

import UserTest from "../views/UserTest.vue";
import test from "../views/test.vue";
import AdminPx from "../views/AdminPx.vue";


import dashboard from "../views/Dashboard";
/* import daboardcus from "../views/DaboardCus"; */
import dashboardcus from "../views/DashboardCus.vue";
import dashboardads from "../views/DashboardAdS.vue";


Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/homepage",
        name: "HomePage",
        component: HomePage,
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
        path: "/adminpx",
        name: "adminpx",
        component: AdminPx,
    },

    {
        path: "/test",
        name: "test",
        component: test,
    },

    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/dashboard",
        component: dashboard,
        children: [{
                path: "/daboardadpx",
                component: () =>
                    import ( /* webpackChunkName: "Messages" */ "../views/DaboardAdPx.vue"),
            },
            {
                path: "/manageemb",
                component: () =>
                    import ( /* webpackChunkName: "Messages" */ "../views/ManageEmb.vue"),
            },
            {
                path: "/managecus",
                component: () =>
                    import ( /* webpackChunkName: "Profile" */ "../views/ManageCus.vue"),
            },
            {
                path: "/payment",
                component: () =>
                    import ( /* webpackChunkName: "Settings" */ "../views/Payment.vue"),
            },
            {
                path: "/updateaccount",
                component: () =>
                    import (
                        /* webpackChunkName: "Settings" */
                        "../views/UpdateAccount.vue"
                    ),
            },
        ],
    },
    {
        path: "/dashboardcus",
        component: dashboardcus,
        children: [{
                path: "/daboardcus",
                component: () =>
                    import ( /* webpackChunkName: "Messages" */ "../views/DaboardCus.vue"),
            },
            {
                path: "/paymentcus",
                component: () =>
                    import ( /* webpackChunkName: "Settings" */ "../views/PaymentCus.vue"),
            },
            {
                path: "/upaccountcus",
                component: () =>
                    import (
                        /* webpackChunkName: "Settings" */
                        "../views/UpAccountCus.vue"
                    ),
            },
            {
                path: "/ratecus",
                component: () =>
                    import (
                        /* webpackChunkName: "Settings" */
                        "../views/RateCus.vue"
                    ),
            },
        ],
    },
    {
        path: "/dashboardads",
        component: dashboardads,
        children: [{
                path: "/admincrud",
                component: () =>
                    import ( /* webpackChunkName: "Messages" */ "../views/AdminCRUD.vue"),
            },
            {
                path: "/epricecrud",
                component: () =>
                    import ( /* webpackChunkName: "Settings" */ "../views/EpriceCRUD.vue"),
            },
            {
                path: "/upaccountads",
                component: () =>
                    import (
                        /* webpackChunkName: "Settings" */
                        "../views/UpAccountAdS.vue"
                    ),
            },
            {
                path: "/rolead",
                component: () =>
                    import (
                        /* webpackChunkName: "Settings" */
                        "../views/RoleAd.vue"
                    ),
            },
            {
                path: "/areacrud",
                component: () =>
                    import ( /* webpackChunkName: "Messages" */ "../views/AreaCRUD.vue"),
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;