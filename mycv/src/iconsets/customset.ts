// @ts-nocheck
import { h } from "vue"
import type { IconSet, IconProps } from "vuetify"

// Social networks icons
import githubIcon from '@/assets/icons/Contacts/github-icon.vue'
import instagramIcon from '@/assets/icons/Contacts/instagram-icon.vue'
import linkedinIcon from '@/assets/icons/Contacts/linkedin-icon.vue'
import mailIcon from '@/assets/icons/Contacts/mail-icon.vue'
import telegramIcon from '@/assets/icons/Contacts/telegram-icon.vue'
import vkontakteIcon from '@/assets/icons/Contacts/vkontakte-icon.vue'
import whatsappIcon from '@/assets/icons/Contacts/whatsapp-icon.vue'
import youtubeIcon from '@/assets/icons/Contacts/youtube-icon.vue'

// Frameworks icons
import bootstrapIcon from '@/assets/icons/Software/bootstrap-icon.vue'
import quasarIcon from '@/assets/icons/Software/quasar-icon.vue'
import vueIcon  from '@/assets/icons/Software/vue-icon.vue'
import vuetifyIcon from '@/assets/icons/Software/vuetify-icon.vue'

// Language icons
import bashIcon from '@/assets/icons/Software/bash-icon.vue'
import cssIcon from '@/assets/icons/Software/css-icon.vue'
import htmlIcon from '@/assets/icons/Software/html-icon.vue'
import javaIcon from '@/assets/icons/Software/java-icon.vue'
import jsIcon  from '@/assets/icons/Software/js-icon.vue'
import phpIcon from '@/assets/icons/Software/php-icon.vue'
import pythonIcon from '@/assets/icons/Software/python-icon.vue'
import sassIcon from '@/assets/icons/Software/sass-icon.vue'
import kotlinIcon from '@/assets/icons/Software/kotlin-icon.vue'

// Software & OS icons
import windowsIcon from '@/assets/icons/Software/windows-icon.vue'
import debianIcon from '@/assets/icons/Software/debian-icon.vue'
import vscodeIcon from '@/assets/icons/Software/vscode-icon.vue'
import jetbrainsIcon from '@/assets/icons/Software/jetbrains-icon.vue'
import blenderIcon from '@/assets/icons/Tools/blender-icon.vue'
import cinemafdIcon from '@/assets/icons/Tools/cinema4d-icon.vue'
import aiIcon from '@/assets/icons/Tools/illustrator-icon.vue'
import psIcon from '@/assets/icons/Tools/photoshop-icon.vue'
import lighthouseIcon from '@/assets/icons/Tools/lighthouse-icon.vue'
import powershellIcon from '@/assets/icons/Tools/powershell-icon.vue'

// CMS's icons
import wordpressIcon from '@/assets/icons/Software/wordpress-icon.vue'
import mediawikiIcon from '@/assets/icons/Software/mediawiki-icon.vue'

// Technologies icons
import apiIcon from '@/assets/icons/Software/api-icon.vue'
import gitIcon  from '@/assets/icons/Software/git-icon.vue'
import nginxIcon from '@/assets/icons/Software/nginx-icon.vue'
import nodeIcon  from '@/assets/icons/Software/node-icon.vue'
import webpackIcon from '@/assets/icons/Software/webpack-icon.vue'
import sqlIcon from '@/assets/icons/Software/sql-icon.vue'


const myIconPack: any = {
  githubIcon,
  instagramIcon,
  linkedinIcon,
  mailIcon,
  telegramIcon,
  vkontakteIcon,
  whatsappIcon,
  youtubeIcon,

  bootstrapIcon,
  quasarIcon,
  vueIcon,
  vuetifyIcon,

  bashIcon,
  cssIcon,
  htmlIcon,
  javaIcon,
  jsIcon,
  phpIcon,
  pythonIcon,
  sassIcon,
  kotlinIcon,

  wordpressIcon,
  mediawikiIcon,

  windowsIcon,
  debianIcon,
  jetbrainsIcon,
  vscodeIcon,
  blenderIcon,
  cinemafdIcon,
  aiIcon,
  psIcon,
  lighthouseIcon,
  powershellIcon,

  apiIcon,
  gitIcon,
  nginxIcon,
  nodeIcon,
  sqlIcon,
  webpackIcon
};

const custom: IconSet = {
  component: (props: IconProps) =>
    h(props.tag, [h(myIconPack[props.icon as string], { class: 'v-icon__svg' })]),
}

export { custom as default }