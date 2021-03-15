import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import { createRouter, createWebHistory } from 'vue-router'
import Index from './pages/Index.vue'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import './index.css'

const routes = [
  { path: "/", component: Index }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App)
app.use(store)
app.use(router);
app.use(VueClipboard)
app.mount('#app')
