import {createWebHistory, createRouter} from 'vue-router'
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import LearningComponent from "../pages/LearningComponent.vue";
import Task from "../components/Task/Task.vue";
import TasksTemplatesPage from "../pages/TasksTemplatesPage.vue";
import TaskTemplate from "../components/TaskTemplate/TaskTemplate.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },{
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
                meta: {activeTab: 0}
            },
            {
                path: 'tasks/:id',
                component: Task,
                meta: {activeTab: 0}
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
            }
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