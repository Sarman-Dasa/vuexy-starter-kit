import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/auth/Registration.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPassword.vue'),
      meta: {
        layout: 'full'
      },
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component : () => import('@/views/auth/ResetPassword.vue'),
      meta: {
        layout: 'full'
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/user/UserProfile.vue'),
      meta: {
        pageTitle: 'Profile',
        breadcrumb: [
          {
            text: 'Profile',
            active: true,
          },
        ],
      },
    },
    {
      path: '/user-list',
      name: 'user-list',
      component: () => import('@/views/user/UserList.vue'),
      meta: {
        pageTitle: 'User List',
        breadcrumb: [
          {
            text: 'user list',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login-mobile',
      name: 'login-mobile',
      component: () => import('@/views/auth/LoginWithMobile.vue'),
      meta: {
        layout: 'full',
      }
    },
    {
      path: '/test-list',
      name: 'test-list',
      component: () => import('@/views/user/TestListApi.vue'),
      meta: {
        layout:'full'
      },
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('@/views/user/ChangePassword.vue'),
      meta: {
        breadcrumb :[
          {
            text:'ChangePassword',
            active:true,
          },
        ],
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
