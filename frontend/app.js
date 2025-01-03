import App from '@frontend/App.vue';
import Router from '@/router/index.js';
import { createApp } from 'vue';
import store from '@store/index.js';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Ripple from 'primevue/ripple';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted: (el) => {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};

const app = createApp(App);
app.use(Router);
app.use(store);
app.use(PrimeVue);
app.use(ToastService);
app.directive('click-outside', clickOutside);
app.directive('ripple', Ripple);
app.component('Textarea', Textarea);
app.component('Button', Button);
app.mount('#app');
