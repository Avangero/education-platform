import App from './App.vue';
import Router from './src/router/index.js'
import {createApp} from 'vue';
import store from "./store/index.js";

const app = createApp(App);
app.use(Router)
app.use(store)
app.mount('#app')

