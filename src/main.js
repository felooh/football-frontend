import { createApp } from 'vue'
import App from './App.vue'
import router from "./routers"
import vueCountryRegionSelect from 'vue3-country-region-select'
import store from './store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'






axios.defaults.baseURL="http://localhost:8000/"


createApp(App).use(store).use(router).use(vueCountryRegionSelect).mount('#app');

