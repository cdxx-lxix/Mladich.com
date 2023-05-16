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
            <v-container>
              <v-expansion-panels>
                <v-expansion-panel v-for="item in stack" :key="item">
                  <v-expansion-panel-title disable-icon-rotate>{{ item.tooltip }}
                    <template v-slot:actions>
                      <v-icon :icon="item.icon"></v-icon>
                    </template>
                  </v-expansion-panel-title>

                  <v-expansion-panel-text>
                    {{ $t('stack.' + item.more) }}
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-container>
          </v-card>
        </v-col>

      </v-row>

      <v-row class="ma-2">
        <v-col cols="4">
          <v-card class="ma-2 pa-2">
            <v-card-title>Tools</v-card-title>
            <v-card-subtitle>Things that are convenient to me</v-card-subtitle>
            <v-list lines="one" density="compact">
              <v-list-item v-for="tool in tools" :key="tool.title" :title="tool.title" :subtitle="$t(tool.text)">
                <template v-slot:prepend>
                  <v-avatar><v-icon :icon="tool.icon"></v-icon></v-avatar>
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
import { useAppStore } from '@/store/app'
export default {
  data() {
    return {
      photo: myPhoto,
      age: '',
      stack: {
        js: { icon: 'custom:jsIcon', more: 'js', tooltip: 'Javascript (ES6)' },
        css: { icon: 'custom:cssIcon', more: 'css', tooltip: 'CSS3' },
        html: { icon: 'custom:htmlIcon', more: 'html', tooltip: 'HTML5' },
        py: { icon: 'custom:pythonIcon', more: 'py', tooltip: 'Python' },
        php: { icon: 'custom:phpIcon', more: 'php', tooltip: 'PHP' },
        java: { icon: 'custom:javaIcon', more: 'java', tooltip: 'Java' },
        bash: { icon: 'custom:bashIcon', more: 'bash', tooltip: 'Bash' },
        vue: { icon: 'custom:vueIcon', more: 'vue', tooltip: 'Vue' },
        boot: { icon: 'custom:bootstrapIcon', more: 'boot', tooltip: 'Bootstrap' },
        quasar: { icon: 'custom:quasarIcon', more: 'quasar', tooltip: 'Quasar' },
        vuetify: { icon: 'custom:vuetifyIcon', more: 'vuetify', tooltip: 'Vuetify' },
        git: { icon: 'custom:gitIcon', more: 'git', tooltip: 'Git' },
        api: { icon: 'custom:apiIcon', more: 'api', tooltip: 'API' },
        sql: { icon: 'custom:sqlIcon', more: 'sql', tooltip: 'SQL' },
        nginx: { icon: 'custom:nginxIcon', more: 'nginx', tooltip: 'Nginx' },
        node: { icon: 'custom:nodeIcon', more: 'nodejs', tooltip: 'Node.js' },
        webpack: { icon: 'custom:webpackIcon', more: 'webpack', tooltip: 'Webpack' },
        wp: { icon: 'custom:wordpressIcon', more: 'wordpress', tooltip: 'Wordpress' },
        mw: { icon: 'custom:mediawikiIcon', more: 'mediawiki', tooltip: 'MediaWiki' }
      },
      tools: {
        win: { icon: 'custom:windowsIcon', title: 'Windows', text: 'tools.win' },
        deb: { icon: 'custom:debianIcon', title: 'Debian', text: 'tools.deb' },
        vsc: { icon: 'custom:vscodeIcon', title: 'VSCode', text: 'tools.vsc' },
        jet: { icon: 'custom:jetbrainsIcon', title: 'JetBrains', text: 'tools.jet' },
        git: { icon: 'custom:githubIcon', title: 'Github', text: 'tools.git' },
        psh: { icon: 'custom:powershellIcon', title: 'Powershell', text: 'tools.psh' },
        lth: { icon: 'custom:lighthouseIcon', title: 'Lighthouse', text: 'tools.lth' },
        bln: { icon: 'custom:blenderIcon', title: 'Blender', text: 'tools.bln' },
        cfd: { icon: 'custom:cinemafdIcon', title: 'Cinema 4D', text: 'tools.cfd' },
        aps: { icon: 'custom:psIcon', title: 'Photoshop', text: 'tools.aps' },
        ail: { icon: 'custom:aiIcon', title: 'Illustrator', text: 'tools.ail' }
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