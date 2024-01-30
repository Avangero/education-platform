import App from './App.vue';
import Router from './src/router/index.js'
import {createApp} from 'vue';
import store from "./store/index.js";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import "primeflex/primeflex.css";

const app = createApp(App);
app.use(Router)
app.use(store)
app.use(PrimeVue);
app.use(ToastService);
app.mount('#app')

