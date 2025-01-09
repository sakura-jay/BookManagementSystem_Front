import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/userMain'
  },
  {
    path: '/userLogin',
    name: 'UserLogin',
    component: () => import('@/views/UserLogin.vue')
  },
  {
    path: '/userRegister',
    name: 'UserRegister',
    component: () => import('@/views/UserRegister.vue')
  },
  {
    path: '/adminMain',
    component: () => import('@/components/AdminMain.vue'),
    children:[
      {
        path: 'userList',
        component: () => import('@/views/UserList.vue')
      },
      {
        path: 'bookList',
        component: () => import('@/views/BookList.vue')
      },
      {
        path: 'entryBook',
        component: () => import('@/views/EntryBook.vue')
      }
    ]
  },
  {
    path: '/userMain',
    component: () => import('@/components/UserMain.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
