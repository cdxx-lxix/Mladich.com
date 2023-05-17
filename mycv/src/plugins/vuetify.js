/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { mdi } from "vuetify/iconsets/mdi";
import custom from '@/iconsets/customset'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#00BFA5', // teal-accent-4
          secondary: '#651FFF', // deep-purple-accent-3
        },
      },
      dark: {
        colors: {
          primary: '#304FFE', // indigo-accent-4
          secondary: '#EF6C00', // orange-darken-3
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
      custom: custom,
    },
  },
})
