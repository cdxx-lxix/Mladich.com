// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        // Main Home view 
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
      },
      {
        // About me page. 
        path: 'about-me',
        name: 'About me',
        component: () => import(/* webpackChunkName: "about" */ '@/views/AboutMe.vue'),
      },
      {
        // Contact page. 
        path: 'contacts',
        name: 'Contacts',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Contacts.vue'),
      },
      {
        // My projects page. 
        path: 'projects',
        name: 'My projects',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Projects.vue'),
      },
      {
        // Guides page. 
        path: 'guides',
        name: 'Guides',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Guides.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
