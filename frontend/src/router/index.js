import { createWebHistory, createRouter } from 'vue-router';
import Home from '@pages/core/HomePage.vue';
import Login from '@pages/core/LoginPage.vue';
import TaskListPage from "@pages/Tasks/TaskListPage.vue";
import NotFound from '@pages/core/NotFoundPage.vue';
import TaskPage from '@pages/Tasks/TaskPage.vue';

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
