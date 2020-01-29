import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue' // 真正的主页
import Main from '../views/Main.vue' // 主页面框架，导航及router-view

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/home', name: 'home', component: Home }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
