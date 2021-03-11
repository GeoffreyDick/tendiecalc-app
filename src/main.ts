import axios from 'axios'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './index.css'

const app = createApp(App)
app.use(VueAxios, axios)
app.mount('#app')

