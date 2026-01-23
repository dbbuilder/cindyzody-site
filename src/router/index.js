import { createRouter, createWebHistory } from 'vue-router'

/**
 * Lazy-loaded route components for code splitting
 * Each page is loaded only when navigated to
 */

// Main pages
const Home = () => import('../pages/Home.vue')
const About = () => import('../pages/About.vue')
const Services = () => import('../pages/Services.vue')
const Approach = () => import('../pages/Approach.vue')
const Practice = () => import('../pages/Practice.vue')
const History = () => import('../pages/History.vue')
const Progress = () => import('../pages/Progress.vue')
const Groups = () => import('../pages/Groups.vue')
const Resources = () => import('../pages/Resources.vue')
const Contact = () => import('../pages/Contact.vue')
const Privacy = () => import('../pages/Privacy.vue')
const AuthCallback = () => import('../pages/AuthCallback.vue')

// Approach sub-pages
const EmotionalIntelligence = () => import('../pages/approach/EmotionalIntelligence.vue')
const NVC = () => import('../pages/approach/NVC.vue')
const IFS = () => import('../pages/approach/IFS.vue')
const Mindfulness = () => import('../pages/approach/Mindfulness.vue')
const AttitudinalHealing = () => import('../pages/approach/AttitudinalHealing.vue')
const ConflictResolution = () => import('../pages/approach/ConflictResolution.vue')
const Outcomes = () => import('../pages/approach/Outcomes.vue')

// Services sub-pages
const ServicesIndividual = () => import('../pages/services/Individual.vue')
const ServicesCouples = () => import('../pages/services/Couples.vue')
const ServicesGroups = () => import('../pages/services/GroupsWorkshops.vue')
const ServicesWorkplace = () => import('../pages/services/Workplace.vue')

// Groups sub-pages
const GroupsNVCFoundations = () => import('../pages/groups/NVCFoundations.vue')
const GroupsMindfulCommunication = () => import('../pages/groups/MindfulCommunication.vue')
const GroupsRepairAfterConflict = () => import('../pages/groups/RepairAfterConflict.vue')

// Practice GOFNR step pages
const PracticeGoals = () => import('../pages/practice/Goals.vue')
const PracticeObservation = () => import('../pages/practice/Observation.vue')
const PracticeFeelings = () => import('../pages/practice/Feelings.vue')
const PracticeNeeds = () => import('../pages/practice/Needs.vue')
const PracticeRequest = () => import('../pages/practice/Request.vue')
const PracticeScenarios = () => import('../pages/practice/Scenarios.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },

  // Services
  { path: '/services', component: Services },
  { path: '/services/individual', component: ServicesIndividual },
  { path: '/services/couples', component: ServicesCouples },
  { path: '/services/groups', component: ServicesGroups },
  { path: '/services/workplace', component: ServicesWorkplace },

  // Approach
  { path: '/approach', component: Approach },
  { path: '/approach/emotional-intelligence', component: EmotionalIntelligence },
  { path: '/approach/nvc', component: NVC },
  { path: '/approach/ifs', component: IFS },
  { path: '/approach/mindfulness', component: Mindfulness },
  { path: '/approach/attitudinal-healing', component: AttitudinalHealing },
  { path: '/approach/conflict-resolution', component: ConflictResolution },
  { path: '/approach/outcomes', component: Outcomes },

  // Practice
  { path: '/practice', component: Practice },
  { path: '/practice/goals', component: PracticeGoals },
  { path: '/practice/observation', component: PracticeObservation },
  { path: '/practice/feelings', component: PracticeFeelings },
  { path: '/practice/needs', component: PracticeNeeds },
  { path: '/practice/request', component: PracticeRequest },
  { path: '/practice/scenarios', component: PracticeScenarios },
  { path: '/history', component: History },
  { path: '/progress', component: Progress },

  // Groups
  { path: '/groups', component: Groups },
  { path: '/groups/nvc-foundations', component: GroupsNVCFoundations },
  { path: '/groups/mindful-communication', component: GroupsMindfulCommunication },
  { path: '/groups/repair-after-conflict', component: GroupsRepairAfterConflict },

  // Other
  { path: '/resources', component: Resources },
  { path: '/contact', component: Contact },
  { path: '/privacy', component: Privacy },
  { path: '/auth/callback', component: AuthCallback }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})
