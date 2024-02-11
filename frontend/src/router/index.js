import {createWebHistory, createRouter} from 'vue-router'
import Home from "../views/HomePage.vue";
import Login from "../views/LoginPage.vue";
import LearningComponent from "../pages/LearningComponentPage.vue";
import TasksTemplatesPage from "../pages/TasksTemplatesPage.vue";
import TaskTemplate from "../components/TaskTemplate/TaskTemplate.vue";
import NotFound from "../pages/NotFoundPage.vue";
import TaskPage from "../pages/TaskPage.vue";

const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    }, {
        path: "/",
        name: "home",
        component: Home,
        redirect: '/tasks',
        meta: {
            middleware: "auth",
        },
        children: [
            {
                path: "tasks",
                name: "tasks",
                component: LearningComponent,
                meta: {activeTab: 0},
            },
            {
                path: 'tasks/:id',
                component: TaskPage,
                meta: {activeTab: 0},
            },
            {
                path: "courses-templates",
                name: "courses-templates",
                component: LearningComponent,
                meta: {activeTab: 4}
            },
            {
                path: "tasks-templates",
                name: "tasks-templates",
                component: TasksTemplatesPage,
                meta: {activeTab: 5}
            },
            {
                path: "tasks-templates/:id",
                name: "task-template",
                component: TaskTemplate,
                meta: {activeTab: 5}
            },
            {
                path: '/:pathMatch(.*)*',
                component: NotFound,
                meta: {activeTab: null}
            },
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware === "guest") {
        if (localStorage.getItem('isAuth') === 'true') {
            next({name: "tasks"})
        } else {
            next()
        }
    } else {
        if (localStorage.getItem('isAuth') === 'true') {
            next()
        } else {
            next({name: "login"})
        }
    }
})
export default router
