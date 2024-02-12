import { createStore } from 'vuex';
import auth from './core/auth.js';
import tasks from './tasks/tasks.js';
import navbar from './core/navbar.js';
import tasksTemplates from './tasks/tasksTemplates.js';
import toasts from './core/toasts.js';

const store = createStore({
    modules: {
        auth,
        tasks,
        navbar,
        tasksTemplates,
        toasts
    }
});
export default store;
