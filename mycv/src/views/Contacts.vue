<template>
    <v-row class="ma-4">
      <v-col cols="12" sm="12" md="6" lg="8" class="d-flex flex-director">
        <v-card class="pa-5 my-4 flex-grow-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d95300.59935919014!2d44.81080477480467!3d41.717417262377076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1682701190769!5m2!1sen!2sge"
            width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4" class="d-flex flex-director">
        <v-card class="my-4 flex-grow-1">
          <v-card-text>{{ $t('contacts.text') }}</v-card-text>
          <v-list>
            <v-list-subheader>{{ $t('contacts.title') }}</v-list-subheader>
            <v-list-item v-for="option in options" :key="option" :href="option.link">
              <template v-slot:prepend>
                <v-avatar :icon="option.icon" class="ma-2"></v-avatar>
              </template>
              <v-list-item-title v-text="option.tooltip"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
</template>
  
<script >
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
export default {
  data() {
    return {
      options: {
        mail: { icon: 'custom:mailIcon', link: 'mailto:alex@mladich.com', tooltip: 'E-mail', id: 1 },
        github: { icon: 'custom:githubIcon', link: 'https://github.com/cdxx-lxix', tooltip: 'Github', id: 2 },
        instagram: { icon: 'custom:instagramIcon', link: 'https://www.instagram.com/amladich/', tooltip: 'Instagram', id: 3 },
        linkedin: { icon: 'custom:linkedinIcon', link: 'https://www.linkedin.com/in/aleksandr-mladich-656534174/', tooltip: 'LinkedIn', id: 4 },
        telegram: { icon: 'custom:telegramIcon', link: 'https://t.me/cdxx_lxix', tooltip: 'Telegram', id: 5 },
        whatsapp: { icon: 'custom:whatsappIcon', link: '', tooltip: 'Whatsapp', id: 6 },
        vk: { icon: 'custom:vkontakteIcon', link: '', tooltip: 'Vkontakte', id: 7 }
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