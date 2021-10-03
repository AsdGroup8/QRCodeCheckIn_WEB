import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AccountTable',
    component: () => import("@/views/AccountTable.vue"),
    meta: {
      auth: true,
      title: 'Boom Fish'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login.vue"),
    meta: {
      auth: false,
      title: 'Login'
    }
  },
  {
    path: '/customer/reg',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: {
      auth: false,
      title: 'Customer Register'
    }
  },
  {
    path: '/customer/reserv/history',
    name: 'Reserve History',
    component: () => import('@/views/History.vue'),
    meta: {
      auth: true,
      title: 'Reservation History'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // Tab Title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // Auth
  if (process.env["NODE_ENV"] != "development") {
    if (to.meta.auth) {
      if (store.state.userModule.token)
        next();
      else
        router.push({ path: "/login" });
    }
  }
  next();
})

export default router
