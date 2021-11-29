import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Sign from "../views/Sign.vue";
import Register from "../views/Register.vue";
import HomePage from "../views/HomePage.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/sign",
        name: "Sign",
        component: Sign,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/homepage",
        name: "Homepage",
        component: HomePage,
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
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;