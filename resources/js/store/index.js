import {createStore} from 'vuex'
import auth from './auth.js'
import tasks from './tasks.js'
import navbar from './navbar.js'
import tasksTemplates from "./tasksTemplates";
import errorHandling from "./errorHandling.js";

const store = createStore({
    modules: {
        auth,
        tasks,
        navbar,
        tasksTemplates,
        errorHandling
    }
})
export default store
