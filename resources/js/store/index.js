import {createStore} from 'vuex'
import auth from './auth.js'
import tasks from './tasks.js'
import navbar from './navbar.js'
import tasksTemplates from "./tasksTemplates";

const store = createStore({
    modules: {
        auth,
        tasks,
        navbar,
        tasksTemplates
    }
})
export default store
