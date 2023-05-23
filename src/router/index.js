import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
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
        middleWare: ['humanResource','superAdmin']
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
        middleWare: ['superAdmin']
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
      path: '/todo-add',
      name: 'todo-add',
      component: () => import('@/views/todo/AddTodoTask.vue'),
      meta: {
        breadcrumb :[
          {
            text: 'Todo',
            active:true,
          },
        ],
      },
    },
    {
      path: '/todo',
      name: 'todo-table',
      component: () => import('@/views/todo/TodoList.vue'),
      meta: {
        breadcrumb :[
          {
            text: 'Todo',
            active:true,
          },
        ],
      },
    },
    {
      path: '/todo-edit/:id',
      name: 'todo-edit',
      component: () => import('@/views/todo/AddTodoTask.vue'),
      meta: {
        breadcrumb :[
          {
            text: 'Todo',
            active:true,
          },
        ],
      },
    },
    {
      path: '/apps-todo-filter-tag/:tag',
      name:'apps-todo-filter-tag-high',
      component: () => import('@/views/todo/TodoList.vue'),
      meta: {
        breadcrumb :[
          {
            text: 'Todo',
            active:true,
          },
        ],
      },
    },
    {
      path: '/apps-todo-filter-tag/:tag',
      name:'apps-todo-filter-tag-low',
      component: () => import('@/views/todo/TodoList.vue'),
      meta: {
        breadcrumb :[
          {
            text: 'Todo',
            active:true,
          },
        ],
      },
    },
    {
      path: '/apps-todo-filter-tag/:tag',
      name:'apps-todo-filter-tag-medium',
      component: () => import('@/views/todo/TodoList.vue'),
      meta: {
        breadcrumb :[
          {
            text: 'Todo',
            active:true,
          },
        ],
      },
    },
    {
      path: '/apps-todo-filter/:filter',
      name:'apps-todo-filter',
      component: () => import('@/views/todo/TodoList.vue'),
      meta: {
        breadcrumb :[
          {
            text: 'Todo',
            active:true,
          },
        ],
      },
    },
    {
      path: '/test-vue',
      name: 'test-vue',
      component: () => import('@/views/Test/Chart.vue'),
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

//Check authantication 
router.beforeEach((to,from,next) => {
  let auth_user = store.state.app.authTokenData;

  if(to.name !== 'login' && to.name !== 'registration' && to.name !== 'forgot-password' && to.name !== 'reset-password' && to.name !== 'login-mobile') {
    if(!auth_user) {
      next({ name: 'login' })
    }
    if(auth_user) {
      let loginUser = store.state.app.userInfoData;
      if(to.meta && to.meta.middleWare && !to.meta.middleWare.includes(loginUser.role)){
        next({ name: 'login' })
      }else { next() }
    } 
  }
 return next()
})

export default router
