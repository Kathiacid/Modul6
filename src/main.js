// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// FontAwesome Setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faShieldHalved, faSkull, faBook, faMap, faUser, faGear } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, faShieldHalved, faSkull, faBook, faMap, faUser, faGear)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
