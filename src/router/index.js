import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '@/components/MainLayout'
import Login from '@/components/Login'
import Home from '@/components/Home'

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
      component: () => import('@/templates/sales/SalesList')
    }, {
      path: 'sales/create',
      name: 'SalesCreate',
      meta: {
        title: '판매 등록'
      },
      component: () => import('@/templates/sales/SalesCreate')
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
        title: '고객 등록'
      },
      component: () => import('@/templates/customer/CustomerCreate')
    }, {
      path: 'customer',
      name: 'Customer',
      meta: {
        title: '고객'
      },
      component: () => import('@/templates/customer/CustomerList')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '로그인'
    },
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
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

  next()
})

export default router
