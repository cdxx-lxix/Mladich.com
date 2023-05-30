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
import i18n from './i18n.js'
import { createHead } from "@vueuse/head"
const head = createHead()

const app = createApp(App)

registerPlugins(app)
app.use(i18n)
app.use(head)

app.config.globalProperties.$supportedLanguages = ['en', 'ru']

app.mount('#app')
