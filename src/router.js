// src/router.js
import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from './components/Layout.vue'
import Home from './pages/Home.vue'
import Shop from './pages/Shop.vue'
import Stats from './pages/Stats.vue'
import Contacts from './pages/Contacts.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'shop', component: Shop },
      { path: 'stats', component: Stats },
      { path: 'contacts', component: Contacts }
    ]
  },
]

const router = createRouter({

history: createWebHashHistory(), // 💡 теперь ссылки будут с #
  routes,
})

export default router
