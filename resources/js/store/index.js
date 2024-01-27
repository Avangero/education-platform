import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth.js'
import tasks from './tasks.js'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,
        tasks
    }
})
export default store
