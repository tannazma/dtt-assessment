import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListOfHouses.vue')
    },
    {
      path: '/house/:id',
      name: 'house',
      component: () => import('../views/SingleHouse.vue')
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('../views/CreateNewView.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/EditHouseView.vue')
    }
  ]
})

export default router
