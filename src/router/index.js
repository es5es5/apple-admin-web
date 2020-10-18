import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
import { authService } from '@/plugins/fbase'

import MainLayout from '@/components/MainLayout'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '홈'
    },
    component: Home
  },
  {
    path: '/main',
    name: 'Main',
    redirect: '/main/sales',
    component: MainLayout,
    children: [{
      path: 'sales',
      name: 'Sales',
      meta: {
        title: '판매'
      },
      component: () => import('@/templates/sales/SalesList2')
    }, {
      path: 'sales/create',
      name: 'SalesCreate',
      meta: {
        title: '판매 등록',
        goBack: true
      },
      component: () => import('@/templates/sales/SalesCreate')
    }, {
      path: 'sales/:id',
      name: 'SalesUpdate',
      meta: {
        title: '판매 수정',
        goBack: true
      },
      component: () => import('@/templates/sales/SalesUpdate')
    }, {
      path: 'customer',
      name: 'Customer',
      meta: {
        title: '고객'
      },
      component: () => import('@/templates/customer/CustomerList')
    }, {
      path: 'customer/create',
      name: 'CustomerCreate',
      meta: {
        title: '고객 등록',
        goBack: true
      },
      component: () => import('@/templates/customer/CustomerCreate')
    }, {
      path: 'customer/:id',
      name: 'CustomerUpdate',
      meta: {
        title: '고객 수정',
        goBack: true
      },
      component: () => import('@/templates/customer/CustomerUpdate')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '로그인'
    },
    component: Login
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const routeMetaTitle = to.meta.title
  if (!routeMetaTitle) {
    document.title = '충주 사과'
  } else {
    document.title = `${to.meta.title} | 충주 사과`
  }

  authService.onAuthStateChanged(user => {
    if (!user) {
      next({ name: 'Login' })
    } else {
      if (to.name === 'Login') {
        next({ name: 'Home' })
      }
    }
  })

  next()
})

export default router
