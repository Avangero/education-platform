import {createStore} from 'vuex'
import auth from './auth.js'
import tasks from './tasks.js'

const store = createStore({
    modules: {
        auth,
        tasks
    }
})
export default store
