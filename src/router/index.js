import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotificationView from '../views/NotificationView.vue'
import CourseView from '../views/CourseView.vue'
import AddCourseView from '../views/AddCourseView.vue'
import VacancyView from '../views/VacancyView.vue'
import UpdateVacancyView from '../views/UpdateVacancyView.vue'
import AllVacancyView from '../views/AllVacancyView.vue'
import AddVacancyView from '../views/AddVacancyView.vue'
import ApplicationView from '../views/ApplicationView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/notification',
    name: 'notification',
    component: NotificationView
  },
  {
    path: '/course',
    name: 'course',
    component: CourseView
  },
  {
    path: '/add-course',
    name: 'addCourse',
    component: AddCourseView
  },
  {
    path: '/vacancy',
    name: 'vacancy',
    component: VacancyView
  },
  {
    path: '/all-vacancy',
    name: 'allVacancy',
    component: AllVacancyView
  },
  {
    path: '/update-vacancy',
    name: 'updateVacancy',
    component: UpdateVacancyView
  },
  {
    path: '/add-vacancy',
    name: 'add-vacancy',
    component: AddVacancyView
  },
  {
    path: '/application',
    name: 'application',
    component: ApplicationView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to) => {
  if (
    // make sure the user is authenticated
    localStorage.getItem('user') == null &&
    // ❗️ Avoid an infinite redirect
    (to.name !== 'login' && to.name !== 'signup')
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
