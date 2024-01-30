import {createStore} from 'vuex'
import auth from './auth.js'
import tasks from './tasks.js'
import navbar from './navbar.js'

const store = createStore({
    modules: {
        auth,
        tasks,
        navbar
    }
})
export default store
