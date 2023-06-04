/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// My modules
import i18n from './i18n.js' // Localization plugin
import { createHead } from "@vueuse/head" // Meta data manager 
const head = createHead()
import gtag from "vue-gtag-next"

const app = createApp(App)

registerPlugins(app)
app.use(i18n)
app.use(head)
app.config.globalProperties.$supportedLanguages = ['en', 'ru']
app.use(gtag, {
  property: {
    id: import.meta.env.VITE_GTAG
  }
})
app.mount('#app')
