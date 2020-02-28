import Vue from 'vue'
import VueRouter from 'vue-router'
import View from '../views/View.vue'
import Analysis from '../views/Analysis.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/view',
  },
  {
    path: '/view',
    name: 'view',
    component: View,
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: Analysis,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
