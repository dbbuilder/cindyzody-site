import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Services from '../pages/Services.vue'
import Approach from '../pages/Approach.vue'
import Practice from '../pages/Practice.vue'
import History from '../pages/History.vue'
import Progress from '../pages/Progress.vue'
import Groups from '../pages/Groups.vue'
import Resources from '../pages/Resources.vue'
import Contact from '../pages/Contact.vue'
import Privacy from '../pages/Privacy.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/services', component: Services },
  { path: '/approach', component: Approach },
  { path: '/practice', component: Practice },
  { path: '/history', component: History },
  { path: '/progress', component: Progress },
  { path: '/groups', component: Groups },
  { path: '/resources', component: Resources },
  { path: '/contact', component: Contact },
  { path: '/privacy', component: Privacy }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})