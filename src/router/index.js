import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    redirect: '/browse',
  },
  {
    path: '/browse',
    name: 'browse',
    component: () => import('@/views/Browse'),
  },
  {
    path: '/analysis/:file',
    name: 'analysis',
    component: () => import('@/views/Analysis'),
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/Upload'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router