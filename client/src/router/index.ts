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
    path: '/request',
    name: 'RequestSpeaker',
    component: () => import(/* webpackChunkName: "request" */ '../views/RequestSpeaker.vue')
  },
  {
    path: '/availability',
    name: 'SpeakerAvailability',
    component: () => import(/* webpackChunkName: "speaker-availability" */ '../views/SpeakerAvailability.vue')
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
    path: '/activities',
    name: 'Activities',
    component: () => import(/* webpackChunkName: "activities" */ '../views/Activities.vue')
  },
  {
    path: '/participants',
    name: 'Participants',
    component: () => import(/* webpackChunkName: "participants" */ '../views/Participants.vue')
  },
  // {
  //   path: '/community/:id',
  //   name: 'Community',
  //   component: () => import(/* webpackChunkName: "community" */ '../views/Community.vue')
  // },
  {
    path: '/speaker/request/:id',
    name: 'UpdateAvailability',
    component: () => import(/* webpackChunkName: "update-availability" */ '../views/UpdateAvailability.vue')
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

export default router
