import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import(/* webpackChunkName: "events" */ '../views/Events.vue')
  },
  {
    path: '/speakers',
    name: 'Speakers',
    component: () => import(/* webpackChunkName: "speakers" */ '../views/Speakers.vue')
  },
  {
    path: '/create',
    name: 'CreateEvent',
    component: () => import(/* webpackChunkName: "create-event" */ '../views/CreateEvent.vue')
  },
  {
    path: '/event/register/:id',
    name: 'EventRegister',
    component: () => import(/* webpackChunkName: "register" */ '../views/EventRegister.vue')
  },
  {
    path: '/event/feedback/:eId/participant/:pId',
    name: 'EventFeedback',
    component: () => import(/* webpackChunkName: "feedback" */ '../views/EventFeedback.vue')
  },
  {
    path: '/coming-soon',
    name: 'ComingSoon',
    component: () => import(/* webpackChunkName: "comingsoon" */ '../views/ComingSoon.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("userDetails");
  store.dispatch("setUser", JSON.parse(user));
  if (to.name !== 'Home' && !user) {
    next('Home');
  } else
    next();
})

export default router
