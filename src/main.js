import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

import { loadAnalytics } from './utils/analytics'
import { injectLDJson } from './utils/structuredData'

const app = createApp(App)
app.use(router)
app.mount('#app')

loadAnalytics()
injectLDJson()