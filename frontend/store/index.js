import { createStore } from 'vuex';
import auth from '@store/core/auth.js';
import tasks from '@store/tasks/tasks.js';
import navbar from '@store/core/navbar.js';
import tasksTemplates from '@store/tasks/tasksTemplates.js';
import toasts from '@store/core/toasts.js';

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
