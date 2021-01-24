import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import ProfileEdit from '../views/ProfileEdit.vue'
import Bezwaar from '../views/Bezwaar.vue'
import BezwaarList from '../views/BezwaarList.vue'
import Privacyverklaring from '../views/Privacyverklaring.vue'
import CommentRead from '../views/CommentRead.vue'
import CommentCreate from '../views/CommentCreate.vue'
import CommentUpdate from '../views/CommentUpdate.vue'
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/privacyverklaring',
    name: 'Privacyverklaring',
    component: Privacyverklaring
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    meta: { requiresAuth: true },
    component: Profile
  },
  {
    path: '/profile/edit/:id',
    name: 'ProfileEdit',
    meta: { requiresAuth: true },
    component: ProfileEdit
  },
  {
    path: '/bezwaar',
    name: 'Bezwaar',
    meta: { requiresAuth: true },
    component: Bezwaar
  },
  {
    path: '/bezwaarlist',
    name: 'BezwaarList',
    meta: { requiresAuth: true },
    component: BezwaarList
  },
  {
    path: '/read/:id',
    name: 'CommentRead',
    meta: { requiresAuth: true },
    component: CommentRead
  },
  {
    path: '/create',
    name: 'CommentCreate',
    meta: { requiresAuth: true },
    component: CommentCreate
  },
  {
    path: '/update/:id',
    name: 'CommentUpdate',
    meta: { requiresAuth: true },
    component: CommentUpdate,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.getToken == null)
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    else {
      next();
    }
  } else {
    next();
  }
});

export default router
