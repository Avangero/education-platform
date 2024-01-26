import { createApp } from 'vue';
import App from './App.vue';
import router from './src/router/index.js';

const app = createApp(App);

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = localStorage.getItem('access_token');

    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});


app.use(router);

app.mount('#app');
