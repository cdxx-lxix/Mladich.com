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
import { createMetaManager } from 'vue-meta'

const app = createApp(App)
const metaManager = createMetaManager()

registerPlugins(app)
app.use(i18n);
app.use(metaManager)

app.config.globalProperties.$supportedLanguages = ['en', 'ru']

app.mount('#app')
