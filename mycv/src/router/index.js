// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { trackRouter } from "vue-gtag-next"

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
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
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
        component: () => import(/* webpackChunkName: "contacts" */ '@/views/Contacts.vue'),
      },
      {
        // My projects page. 
        path: 'projects',
        name: 'My projects',
        component: () => import(/* webpackChunkName: "projects" */ '@/views/Projects.vue'),
      },
      {
        // Template for a detailed view of the project.
        path: 'projects/:slug',
        name: 'The project',
        component: () => import(/* webpackChunkName: "projectPage" */ '@/views/ProjectPage.vue'),
        props: true,
      },
      {
        // Guides page. 
        path: 'guides',
        name: 'Guides',
        component: () => import(/* webpackChunkName: "guides" */ '@/views/Guides.vue'),
      },
      {
        // Template for a detailed view of the guide.
        path: 'guides/:slug',
        name: 'The guide',
        component: () => import(/* webpackChunkName: "guidePage" */ '@/views/GuidePage.vue'),
        props: true,
      },
      {
        // Youtube channel.
        path: 'youtube',
        name: 'Youtube',
        component: () => import(/* webpackChunkName: "youtubeRedirect" */'@/views/Youtube.vue'),
      },
      {
        // Certificates page.
        path: 'certificates',
        name: 'Certificates',
        component: () => import(/* webpackChunkName: "certificates" */ '@/views/Certificates.vue')
      },
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
trackRouter(router)
export default router
