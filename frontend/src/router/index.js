import { createWebHistory, createRouter } from 'vue-router';
import Home from '../pages/core/HomePage.vue';
import Login from '../pages/core/LoginPage.vue';
import TaskListPage from "../pages/Tasks/TaskListPage.vue";
import TasksTemplatesPage from '../pages/admin/TasksTemplatesPage.vue';
import TaskTemplate from '../components/Tasks/admin/TaskTemplate/TaskTemplate.vue';
import NotFound from '../pages/core/NotFoundPage.vue';
import TaskPage from '../pages/Tasks/TaskPage.vue';

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      middleware: 'guest',
      title: `Login`
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/tasks',
    meta: {
      middleware: 'auth'
    },
    children: [
      {
        path: 'tasks',
        name: 'tasks',
        component: TaskListPage,
        meta: { activeTab: 0 }
      },
      {
        path: 'tasks/:id',
        component: TaskPage,
        meta: { activeTab: 0 }
      },
      {
        path: 'courses-templates',
        name: 'courses-templates',
        component: TaskListPage,
        meta: { activeTab: 4 }
      },
      {
        path: 'tasks-templates',
        name: 'tasks-templates',
        component: TasksTemplatesPage,
        meta: { activeTab: 5 }
      },
      {
        path: 'tasks-templates/:id',
        name: 'task-template',
        component: TaskTemplate,
        meta: { activeTab: 5 }
      },
      {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        meta: { activeTab: null }
      }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.meta.middleware === 'guest') {
    if (localStorage.getItem('isAuth') === 'true') {
      next({ name: 'tasks' });
    } else {
      next();
    }
  } else {
    if (localStorage.getItem('isAuth') === 'true') {
      next();
    } else {
      next({ name: 'login' });
    }
  }
});
export default router;
