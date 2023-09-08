//setup to TailwindCSS
import './assets/tailwind.css'


//setup to Vue.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './storage/index'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
