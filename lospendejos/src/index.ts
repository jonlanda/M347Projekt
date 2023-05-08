import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import filmView from './FilmView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/:id',
    name: 'view',
    component: filmView,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
