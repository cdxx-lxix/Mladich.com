<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row>
          <v-col cols="8">
            <v-card class="pa-4 my-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d95300.59935919014!2d44.81080477480467!3d41.717417262377076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1682701190769!5m2!1sen!2sge"
                width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="pa-4 my-4">
            </v-card>
          </v-col>
        </v-row>
        <v-card :title="$t('contacts.title_ways')" class="pa-4">
          <v-timeline direction="horizontal" line-inset="12">
            <v-timeline-item v-for="option in options" :key="option" :dot-color="currentTheme === 'dark' ? 'indigo-accent-4' : 'teal-accent-4'" fill-dot>
                <template v-slot:icon>
                  <v-avatar :icon="option.icon" class="ma-2"></v-avatar>
                </template>
              <template v-slot:opposite>
                <v-btn variant="text" :href="option.link" v-if="option.id % 2 === 1">{{ option.tooltip }}</v-btn>
              </template>
              <v-btn variant="text" :href="option.link" v-if="option.id % 2 !== 1">{{ option.tooltip }}</v-btn>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script >
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
export default {
  data() {
    return {
      options: {
        // I've not found any way to make items on the same side with itegrated methods so I came up with this odd\even method.
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
    // Retrieve value from global storage to change my v-sheets and other things accordingly v-icon--size-x-large
    const store = useAppStore()
    const currentTheme = computed(() => store.currentUsersTheme)

    return {
      currentTheme
    }
  }
}
</script>
  