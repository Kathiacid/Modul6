import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHeart, faShieldHalved, faSkull, faBook, faUser,
  faWandSparkles, faMagnifyingGlass, faXmark,
  faDiceD20, faCircleCheck, faMapLocationDot
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faHeart, faShieldHalved, faSkull, faBook, faUser,
  faWandSparkles, faMagnifyingGlass, faXmark,
  faDiceD20, faCircleCheck, faMapLocationDot
);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// --- REGISTRO DE LA DIRECTIVA PERSONALIZADA ---
app.directive('glow', {
  mounted(el, binding) {
    // Si pasas un valor como v-glow="'#ff0000'", usará ese color
    const color = binding.value || 'rgba(255, 255, 255, 0.6)';
    el.style.boxShadow = `0 0 15px ${color}`;
    el.style.transition = 'box-shadow 0.3s ease-in-out';
  }
});
// ----------------------------------------------

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(pinia);
app.mount('#app');
