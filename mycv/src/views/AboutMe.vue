<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row class="ma-2">

        <v-col cols="4">
          <v-card class="ma-2 pa-2">
            <v-img :src="photo" cover class="text-white">
              <v-card-title>{{ $t('aboutme.c1_title') }}</v-card-title>
            </v-img>
            <v-card-item>
              <v-card-title>{{ $t('aboutme.c1_position') }}</v-card-title>
              <v-card-subtitle>
                <span class="me-1">{{ $t('aboutme.c1_status') }}</span>
                <v-icon color="amber-darken-4" icon="mdi-fire-circle" size="small"></v-icon>
              </v-card-subtitle>
            </v-card-item>
            <v-divider />
            <v-card-text>
              <div>{{ $t('aboutme.c1_citizen') }}</div>
              <div>{{ $t('aboutme.c1_location') }}</div>
              <v-divider :thickness="5" class="border-opacity-25 my-2" />
              <div class="text-subtitle-2">{{ $t('aboutme.c1_text', { years: age }) }}</div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card class="ma-2 pa-2">
            <v-card-item>
              <v-card-title>{{ $t('aboutme.c2_title') }}</v-card-title>
            </v-card-item>
            <v-timeline align="start" class="mx-5" side="end">
              <v-timeline-item v-for="(exp, index) in experiences" :key="index"
                :dot-color="currentTheme === 'dark' ? 'indigo-accent-4' : 'teal-accent-4'">
                <template v-slot:icon>
                  <v-avatar :icon="$t('experience.' + exp + '.icon')" class="ma-4"></v-avatar>
                </template>
                <template v-slot:opposite>
                  <span>{{ $t('experience.' + exp + '.workTime') }}</span>
                </template>
                <div class="text-h6">
                  {{ $t('experience.' + exp + '.name') }}
                </div>
                <div>{{ $t('experience.' + exp + '.duties') }}</div>
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card class="ma-2 pa-2">
            <v-card-title>{{ $t('aboutme.c3_title') }}</v-card-title>
            <v-card-subtitle>{{ $t('aboutme.c3_subtitle') }}</v-card-subtitle>
            <v-card variant="outlined" class="ma-2">
              <v-card-title>{{ $t('aboutme.c3_langs') }}</v-card-title>
              <v-row align="start" class="pa-3">
                <v-card-item v-for="lang in it_langs" :key="lang">
                  <v-btn @click="lang.container = !lang.container" :icon="lang.icon" border>
                    <v-avatar :image="lang.icon"></v-avatar>
                    <v-tooltip activator="parent" location="top">{{ lang.tooltip }}</v-tooltip>
                  </v-btn>
                </v-card-item>
              </v-row>
              <v-expand-transition v-for="lang in it_langs" :key="lang">
                <div v-show="lang.container">
                  <v-divider></v-divider>

                  <v-card-text>
                    {{ lang.more }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-card>
        </v-col>

      </v-row>
    </v-col>
  </v-row>
</template>
  
<script>
import myPhoto from '../assets/images/myPhoto.jpg'
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/store/app'
import js from '../assets/icons/Software/language-javascript.svg'
import css from '../assets/icons/Software/language-css3.svg'
import html from '../assets/icons/Software/language-html5.svg'
import py from '../assets/icons/Software/language-python.svg'
import php from '../assets/icons/Software/language-php.svg'
import java from '../assets/icons/Software/language-java.svg'
import bash from '../assets/icons/Software/language-bash.svg'
export default {
  data() {
    return {
      photo: myPhoto,
      age: '',
      it_langs: {
        js: { icon: js, more: 'js', container: false, tooltip: 'Javascript (ES6)' },
        css: { icon: css, more: 'css', container: false, tooltip: 'CSS3' },
        html: { icon: html, more: 'html', container: false, tooltip: 'HTML5' },
        py: { icon: py, more: 'py', container: false, tooltip: 'Python' },
        php: { icon: php, more: 'php', container: false, tooltip: 'PHP' },
        java: { icon: java, more: 'java', container: false, tooltip: 'Java' },
        bash: { icon: bash, more: 'bash', container: false, tooltip: 'Bash' }
      }
    }
  },
  methods: {
    getAge() {
      // Calculates my age with taking month and day into account
      return this.age = Math.abs(new Date(Date.now() - new Date(1994, 9, 16).getTime()).getUTCFullYear() - 1970)
    }
  },
  beforeMount() {
    this.getAge()
  },
  setup() {
    // Iterates over an objects inside i18n locale json
    const { t } = useI18n()
    const experiences = reactive(['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'])
    const localizedExperiences = computed(() => {
      return experiences.map(exp => t('experience.' + exp))
    })
    // React to theme changes
    const store = useAppStore()
    const currentTheme = computed(() => store.currentUsersTheme)

    return {
      experiences,
      localizedExperiences,
      currentTheme
    }
  }
}
</script>

<style></style>