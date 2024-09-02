import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Convert from '../views/Convert.vue';

const routes = [
    {
        path: '/',
        component: Home,
        props: route => ({ baseCurrency: route.params.baseCurrency })
    },
    {
        path: '/convert',
        component: Convert,
        props: route => ({ baseCurrency: route.params.baseCurrency })
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
