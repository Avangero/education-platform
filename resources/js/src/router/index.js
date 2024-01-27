import {createWebHistory, createRouter} from 'vue-router'
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import LearningComponent from "../pages/LearningComponent.vue";
import Task from "../components/Task/Task.vue";

const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            middleware: "auth",
        },
        children: [
            {
                path: "tasks",
                name: "home.tasks",
                component: LearningComponent,
            },
            {
                path: 'tasks/:id',
                component: Task
            }
        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware === "guest") {
        if (localStorage.getItem('isAuth') === 'true') {
            next({name: "home.tasks"})
        }
        next()
    } else {
        if (localStorage.getItem('isAuth') === 'true') {
            next()
        } else {
            next({name: "login"})
        }
    }
})
export default router
