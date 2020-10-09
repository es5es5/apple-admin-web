import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '@/components/MainLayout'
import Login from '@/components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainLayout,
    children: [{
      path: 'apple',
      name: 'Apple',
      component: () => import('@/templates/apple/AppleList')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
