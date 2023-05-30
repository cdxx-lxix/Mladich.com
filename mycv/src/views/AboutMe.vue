<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row class="ma-2">

        <v-col cols="12" lg="4" md="6" class="d-flex flex-director">
          <v-card class="ma-2 pa-2 flex-grow-1">
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

        <v-col cols="12" lg="4" md="6" class="d-flex flex-director">
          <v-card class="ma-2 pa-2 flex-grow-1">
            <v-card-item>
              <v-card-title>{{ $t('aboutme.c2_title') }}</v-card-title>
            </v-card-item>
            <v-timeline align="start" class="mx-5" side="end">
              <v-timeline-item v-for="(exp, index) in experiences" :key="index" dot-color="primary">
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

        <v-col cols="12" lg="4" md="6" class="d-flex flex-director">
          <v-card class="ma-2 pa-2 flex-grow-1">
            <v-card-title>{{ $t('aboutme.c3_title') }}</v-card-title>
            <v-card-subtitle>{{ $t('aboutme.c3_subtitle') }}</v-card-subtitle>
          </v-card>
        </v-col>

        <v-col cols="12" lg="4" md="6" v-for="skill in skills" class="d-flex flex-director">
          <v-card class="ma-2 pa-2 flex-grow-1">
            <v-card-title>{{ $t(skill.title) }}</v-card-title>
            <v-card-subtitle>{{ $t(skill.subtitle) }}</v-card-subtitle>
            <v-list lines="one" density="compact">
              <v-list-item v-for="tool in skill.content" :key="tool.title" :title="tool.title" :subtitle="$t(tool.text)">
                <template v-slot:prepend>
                  <v-icon :icon="tool.icon"></v-icon>
                </template>
                <template v-slot:append>
                  <v-btn icon="mdi-information" variant="text" :disabled="tool.btn" style="pointer-events: none;"></v-btn>
                  <v-tooltip class="my-tooltip" :style="{opacity: 1.0}" :text="$t(tool.tooltip)" activator="parent" v-if="!tool.btn" width="200px"></v-tooltip>
                </template>
              </v-list-item>
            </v-list>
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
import { useHead } from '@vueuse/head'
export default {
  data() {
    return {
      photo: myPhoto,
      age: '',
      skills: {
        tools: {
          title: 'tools.title', subtitle: 'tools.subtitle', content: {
            win: { icon: 'custom:windowsIcon', title: 'Windows', text: 'tools.win', btn: false, tooltip: 'tools.win_more' },
            deb: { icon: 'custom:debianIcon', title: 'Debian', text: 'tools.deb', btn: false, tooltip: 'tools.deb_more' },
            vsc: { icon: 'custom:vscodeIcon', title: 'VSCode', text: 'tools.vsc', btn: false, tooltip: 'tools.vsc_more' },
            jet: { icon: 'custom:jetbrainsIcon', title: 'JetBrains', text: 'tools.jet', btn: false, tooltip: 'tools.jet_more' },
            git: { icon: 'custom:githubIcon', title: 'Github', text: 'tools.git', btn: false, tooltip: 'tools.git_more' },
            psh: { icon: 'custom:powershellIcon', title: 'Powershell', text: 'tools.psh', btn: false, tooltip: 'tools.psh_more' },
            lth: { icon: 'custom:lighthouseIcon', title: 'Lighthouse', text: 'tools.lth', btn: false, tooltip: 'tools.lth_more' },
            bln: { icon: 'custom:blenderIcon', title: 'Blender', text: 'tools.bln', btn: false, tooltip: 'tools.bln_more' },
            cfd: { icon: 'custom:cinemafdIcon', title: 'Cinema 4D', text: 'tools.cfd', btn: false, tooltip: 'tools.cfd_more' },
            aps: { icon: 'custom:psIcon', title: 'Photoshop', text: 'tools.aps', btn: true, tooltip: 'tools.aps.more' },
            ail: { icon: 'custom:aiIcon', title: 'Illustrator', text: 'tools.ail', btn: true, tooltip: 'tools.ail.more' }
          }
        },
        langs_frames: {
          title: 'langs_frames.title', subtitle: 'langs_frames.subtitle', content: {
            js: { icon: 'custom:jsIcon', text: 'langs_frames.js', title: 'Javascript (ES6)', btn: false, tooltip: 'langs_frames.js_more' },
            css: { icon: 'custom:cssIcon', text: 'langs_frames.css', title: 'CSS3', btn: false, tooltip: 'langs_frames.css_more' },
            html: { icon: 'custom:htmlIcon', text: 'langs_frames.html', title: 'HTML5', btn: false, tooltip: 'langs_frames.html_more' },
            py: { icon: 'custom:pythonIcon', text: 'langs_frames.py', title: 'Python', btn: false, tooltip: 'langs_frames.py_more' },
            php: { icon: 'custom:phpIcon', text: 'langs_frames.php', title: 'PHP', btn: false, tooltip: 'langs_frames.php_more' },
            java: { icon: 'custom:javaIcon', text: 'langs_frames.java', title: 'Java', btn: false, tooltip: 'langs_frames.java_more' },
            bash: { icon: 'custom:bashIcon', text: 'langs_frames.bash', title: 'Bash', btn: false, tooltip: 'langs_frames.bash_more' },
            vue: { icon: 'custom:vueIcon', text: 'langs_frames.vue', title: 'Vue', btn: false, tooltip: 'langs_frames.vue_more' },
            boot: { icon: 'custom:bootstrapIcon', text: 'langs_frames.boot', title: 'Bootstrap', btn: false, tooltip: 'langs_frames.boot_more' },
            quasar: { icon: 'custom:quasarIcon', text: 'langs_frames.quasar', title: 'Quasar', btn: false, tooltip: 'langs_frames.quasar_more' },
            vuetify: { icon: 'custom:vuetifyIcon', text: 'langs_frames.vuetify', title: 'Vuetify', btn: false, tooltip: 'langs_frames.vuetify_more' }
          }
        },
        tech_other: {
          title: 'tech_other.title', subtitle: 'tech_other.subtitle', content: {
            git: { icon: 'custom:gitIcon', text: 'tech_other.git', title: 'Git', btn: false, tooltip: 'tech_other.git_more' },
            api: { icon: 'custom:apiIcon', text: 'tech_other.api', title: 'API', btn: false, tooltip: 'tech_other.api_more' },
            sql: { icon: 'custom:sqlIcon', text: 'tech_other.sql', title: 'SQL', btn: false, tooltip: 'tech_other.sql_more' },
            nginx: { icon: 'custom:nginxIcon', text: 'tech_other.nginx', title: 'Nginx', btn: false, tooltip: 'tech_other.nginx_more' },
            node: { icon: 'custom:nodeIcon', text: 'tech_other.nodejs', title: 'Node.js', btn: false, tooltip: 'tech_other.node_more' },
            webpack: { icon: 'custom:webpackIcon', text: 'tech_other.webpack', title: 'Webpack', btn: false, tooltip: 'tech_other.webpack_more' },
            wp: { icon: 'custom:wordpressIcon', text: 'tech_other.wordpress', title: 'Wordpress', btn: false, tooltip: 'tech_other.wordpress_more' },
            mw: { icon: 'custom:mediawikiIcon', text: 'tech_other.mediawiki', title: 'MediaWiki', btn: false, tooltip: 'tech_other.mediawiki_more' }
          }
        }
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
    useHead({
      title: t('menu.aboutme'),
      meta: [
        {
          name: 'description',
          content: t('meta.aboutme_desc'),
        },
        {
          name: 'lang',
          content: localStorage.getItem('lang')
        }
      ],
    })

    return {
      experiences,
      localizedExperiences
    }
  }
}
</script>