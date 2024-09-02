import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Создание экземпляра Vue
const app = createApp(App);

// Использование Vue Router
app.use(router);

// Монтирование Vue приложения
app.mount('#app');
