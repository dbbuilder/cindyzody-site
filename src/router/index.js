import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Services from '../pages/Services.vue'
import Approach from '../pages/Approach.vue'
import EmotionalIntelligence from '../pages/approach/EmotionalIntelligence.vue'
import NVC from '../pages/approach/NVC.vue'
import IFS from '../pages/approach/IFS.vue'
import Mindfulness from '../pages/approach/Mindfulness.vue'
import AttitudinalHealing from '../pages/approach/AttitudinalHealing.vue'
import ConflictResolution from '../pages/approach/ConflictResolution.vue'
import Outcomes from '../pages/approach/Outcomes.vue'
import Practice from '../pages/Practice.vue'
import History from '../pages/History.vue'
import Progress from '../pages/Progress.vue'
import Groups from '../pages/Groups.vue'
import Resources from '../pages/Resources.vue'
import Contact from '../pages/Contact.vue'
import Privacy from '../pages/Privacy.vue'
import AuthCallback from '../pages/AuthCallback.vue'

// Services sub-pages
import ServicesIndividual from '../pages/services/Individual.vue'
import ServicesCouples from '../pages/services/Couples.vue'
import ServicesGroups from '../pages/services/GroupsWorkshops.vue'
import ServicesWorkplace from '../pages/services/Workplace.vue'

// Groups sub-pages
import GroupsNVCFoundations from '../pages/groups/NVCFoundations.vue'
import GroupsMindfulCommunication from '../pages/groups/MindfulCommunication.vue'
import GroupsRepairAfterConflict from '../pages/groups/RepairAfterConflict.vue'

// Practice GOFNR step pages
import PracticeGoals from '../pages/practice/Goals.vue'
import PracticeObservation from '../pages/practice/Observation.vue'
import PracticeFeelings from '../pages/practice/Feelings.vue'
import PracticeNeeds from '../pages/practice/Needs.vue'
import PracticeRequest from '../pages/practice/Request.vue'
import PracticeScenarios from '../pages/practice/Scenarios.vue'

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
