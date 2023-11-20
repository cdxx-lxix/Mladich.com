<template>
  <v-row class="mx-4 h-auto">
    <v-col cols="12" sm="8" md="8" lg="9" class="flex-director d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex">
      <v-card class="pa-5 my-4 flex-grow-1">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d90658.89446524701!2d20.47186801357425!3d44.75856999418076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2srs!4v1700495819421!5m2!1sen!2srs"
          width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </v-card>
    </v-col>
    <v-col cols="12" sm="4" md="4" lg="3" class="d-flex flex-director">
      <v-card class="my-4 flex-grow-1">
        <v-card-text>{{ $t('contacts.text') }}</v-card-text>
        <v-list>
          <v-list-subheader>{{ $t('contacts.title') }}</v-list-subheader>
          <v-list-item v-for="option in options" :key="option.id" :href="option.link" target="_blank">
            <template v-slot:prepend>
              <v-avatar :icon="option.icon" class="ma-2"></v-avatar>
            </template>
            <v-list-item-title v-text="option.tooltip"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>

  <v-card class="mx-7 mb-4" >
    <v-card-text class="text-subtitle-1 text-center">{{ $t('contacts.gratitude') }}</v-card-text>
      <v-row class="pa-4">
        <v-col v-for="thank in thanks" :key="thank.id"  cols="6" sm="4" md="2" lg="2" xl="2">
          <a class="d-flex child-flex" :href="thank.link" target="_blank">
            <v-img :src="thank.icon" :lazy-src="thank.icon" aspect-ratio="1" cover class="bg-grey-lighten-2" />
          </a>
        </v-col>
      </v-row>
  </v-card>
</template>
  
<script >
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import vueTile from "../assets/thankyou/vue_tile.png"
import viteTile from "../assets/thankyou/vite_tile.png"
import vuetifyTile from "../assets/thankyou/vuetify_tile.png"
import icons8Tile from "../assets/thankyou/icons8_tile.png"
import contentfulTile from "../assets/thankyou/contentful_tile.png"
import time4vpsTile from "../assets/thankyou/t4vps_tile.png"
export default {
  data() {
    return {
      options: {
        mail: { icon: 'custom:mailIcon', link: 'mailto:alex@mladich.com', tooltip: 'E-mail', id: 1 },
        github: { icon: 'custom:githubIcon', link: 'https://github.com/cdxx-lxix', tooltip: 'Github', id: 2 },
        instagram: { icon: 'custom:instagramIcon', link: 'https://www.instagram.com/amladich/', tooltip: 'Instagram', id: 3 },
        linkedin: { icon: 'custom:linkedinIcon', link: 'https://www.linkedin.com/in/aleksandr-mladich-656534174/', tooltip: 'LinkedIn', id: 4 },
        telegram: { icon: 'custom:telegramIcon', link: 'https://t.me/cdxx_lxix', tooltip: 'Telegram', id: 5 },
        whatsapp: { icon: 'custom:whatsappIcon', link: 'https://wa.link/m04u47', tooltip: 'Whatsapp', id: 6 },
        vk: { icon: 'custom:vkontakteIcon', link: 'https://vk.com/catcatskitties', tooltip: 'Vkontakte', id: 7 }
      },
      thanks: {
        vue: { icon: vueTile, link: "https://vuejs.org/", id: 1 },
        vite: { icon: viteTile, link: "https://vitejs.dev/", id: 2 },
        vuetify: { icon: vuetifyTile, link: "https://vuetifyjs.com/en/", id: 3 },
        icons8: { icon: icons8Tile, link: "https://icons8.com/", id: 4 },
        contentful: { icon: contentfulTile, link: "https://www.contentful.com/", id: 5 },
        time4vps: { icon: time4vpsTile, link: "https://www.time4vps.com/?affid=7729", id: 6 }
      }
    }
  },
  setup() {
    const { t } = useI18n()
    useHead({
      title: t('menu.contacts'),
      meta: [
        {
          name: 'description',
          content: t('meta.contacts_desc'),
        },
        {
          name: 'lang',
          content: localStorage.getItem('lang')
        }
      ],
    })
  }
}
</script>