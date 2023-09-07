import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'First',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/main',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/main',
        name: 'main',
        component: () => import('../views/main/index.vue')
      },
      {
        path: '/userManagement',
        name: 'userManagement',
        component: () => import('../views/userManagement/userManagement.vue')
      },
      {
        path: '/rotationManagement',
        name: 'rotationManagement',
        component: () =>
          import('../views/rotationManagement/rotationManagement.vue')
      },
      {
        path: '/rotationClassification',
        name: 'rotationClassification',
        component: () =>
          import('../views/rotationManagement/rotationClassification.vue')
      },
      {
        path: '/newsManagement',
        name: 'newsManagement',
        component: () => import('../views/newsManagement/newsManagement.vue')
      },
      {
        path: '/newsClassification',
        name: 'newsClassification',
        component: () => import('../views/newsManagement/newsClassification.vue')
      },
      {
        path: '/systemSettings',
        name: 'systemSettings',
        component: () => import('../views/systemSettings/systemSettings.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
