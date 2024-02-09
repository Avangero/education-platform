import {createStore} from 'vuex'
import auth from './auth.js'
import tasks from './tasks.js'
import navbar from './navbar.js'
import tasksTemplates from "./tasksTemplates";
import toasts from "./toasts.js";

const store = createStore({
    modules: {
        auth,
        tasks,
        navbar,
        tasksTemplates,
        toasts
    }
})
export default store
