import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Canvas',
        component: () => import('../views/canvas.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router