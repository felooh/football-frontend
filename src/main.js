import { createApp } from 'vue'
import App from './App.vue'
import router from "./routers"
import vueCountryRegionSelect from 'vue3-country-region-select'
import store from './store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import '/src/assets/style.css';
import { useDark, useToggle } from "@vueuse/core";



axios.defaults.baseURL="http://localhost:8000/"



// toast
import Swal from 'sweetalert'
Swal({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});



createApp(App)
.use(store)
.use(router)
.use(vueCountryRegionSelect)
.use(useDark)
.use(useToggle)
.mount('#app');

