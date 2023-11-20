<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row class="ma-2">
        <v-col cols="12" class="d-flex flex-director">
          <v-card class="ma-2 pa-2 flex-grow-1">
            <v-row>
              <v-col cols="12" xl="4" lg="4" md="6">
                <v-img :src="photo" cover class="text-white flex-grow-1 fill-height">
                  <v-card-title>{{ $t('aboutme.c1_title') }}</v-card-title>
                </v-img>
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="12" :order="name === 'md' ? 3 : ''">
                <v-card-item>
                  <v-card-title>{{ $t('aboutme.c1_position') }}</v-card-title>
                  <v-card-subtitle>
                    <span class="me-1">{{ $t('aboutme.c1_status') }}</span>
                    <v-icon color="amber-darken-4" icon="mdi-fire-circle" size="small"></v-icon>
                  </v-card-subtitle>
                </v-card-item>
                <v-divider />
                <v-card-text>
                  <div>
                    <span class="me-1">{{ $t('aboutme.c1_location') }}</span>
                    <v-icon color="primary" icon="mdi-earth" size="small"></v-icon>
                  </div>
                  <v-divider :thickness="5" class="border-opacity-25 my-2" />
                  <div class="text-subtitle-2">{{ $t('aboutme.c1_text') }}</div>
                </v-card-text>
              </v-col>
              <v-col cols="12" xl="4" lg="4" md="6">
                <v-card-item>
                    <v-card-title>{{ $t('aboutme.c2_title') }}</v-card-title>
                  </v-card-item>
                  <v-timeline align="start" class="mx-5 pb-4" side="end"  :direction="name === 'sm' ? 'horizontal' : 'vertical'">
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
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" class="d-flex flex-director">
            <v-row>
              <v-col cols="12" lg="3" md="6" sm="6" v-for="block in about" class="d-flex flex-director">
                <v-card class="ma-2 pa-2 flex-grow-1">
                  <v-card-title>{{ block.fields.title }}</v-card-title>
                  <v-card-subtitle>{{ block.fields.subtitle }}</v-card-subtitle>
                  <v-list lines="one" density="compact">
                    <v-list-item v-for="skill in block.fields.skills" :key="skill.title" :title="skill.title"
                      >
                      <template v-slot:prepend>
                        <v-icon :icon="skill.icon"></v-icon>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" class="d-flex flex-director" v-if="loading">
          <v-card class="ma-2 pa-2 flex-grow-1 text-center">
            <div>
              {{ $t('errors.fetchError') }}
            </div>
            <div>
              {{ $t('errors.fetchErrorNotice') }}
            </div>
            <div class="text-center">
              <v-progress-circular class="pa-1 mt-2" :size="70" :width="7" color="secondary"
                indeterminate></v-progress-circular>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-2">
        <v-col cols="12" class="d-flex flex-director">
          <v-card class="ma-2 pa-2 flex-grow-1">
            <v-divider class="my-2" />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
  
<script>
import myPhoto from '../assets/images/photo2.jpg'
import { reactive, computed, ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { fetchContent } from '@/plugins/apiFunctions'
import { useDisplay } from 'vuetify'
export default {
  data() {
    return {
      photo: myPhoto
    }
  },
  setup() {
    const about = ref([])
    const loading = ref(false)
    const { t, locale } = useI18n()
    const { name } = useDisplay()
    const fetcher = async () => {
      try {
        about.value = await fetchContent('about', 'fields.title,fields.subtitle,fields.skills')
      } catch (error) {
        loading.value = true
      }
    }
    watch(locale, fetcher, { immediate: true })
    onMounted(fetcher)
    // Iterates over an objects inside i18n locale json
    const experiences = reactive(['first', 'second', 'third'])
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
      localizedExperiences,
      loading,
      about,
      name
    }
  }
}
</script>