import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import Login from '../views/auth/Login.vue'
import SignUp from '../views/auth/SignUp.vue'
import Admin from '../views/auth/Admin.vue'
import Data from '../views/auth/Data.vue'
import Cultures from '../views/auth/Cultures.vue'
import Spraying from '../views/auth/Spraying.vue'
import Statistics from '../views/auth/Statistics.vue'
import Tasks from '../views/auth/Tasks.vue'
import ChooseCulture from '../views/auth/ChooseCulture.vue'
import CultureData from '../views/auth/CultureData.vue'
import SprayingData from '../views/auth/SprayingData.vue'
import Forgot from '../views/Forgot.vue'
import {getAuth} from 'firebase/auth'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot
  },
  {
    path: '',
    name: 'admin',
    component: Admin,
    redirect: 'data',
    meta: {requiresAuth:true},
    children: [

      {
        path: 'data',
        name: 'data',
        component: Data,
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: Tasks,
      },
      {
        path: 'chooseculture',
        name: 'chooseculture',
        component: ChooseCulture,
      },
      {
        path: 'cultures',
        name: 'cultures',
        component: Cultures,
      },   
      {
        path: 'culturedata/:name',
        name: 'culturedata',
        component: CultureData,
      },  
      {
        path: 'spraying',
        name: 'spraying',
        component: Spraying,
      },
      {
        path: 'sprayingdata/:name',
        name: 'sprayingdata',
        component: SprayingData,
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: Statistics,
      },
      

    ],
  },
  
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = getAuth().currentUser

  if(requiresAuth && !currentUser){
    next('/login')
  } else if (requiresAuth && currentUser){
    next()
  } else{
    next()
  }

})  




export default router
