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
            <v-timeline align="start" class="mx-5" side="end" style="height: 95%; !important">
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

        <v-col cols="12" lg="4" md="6" v-for="block in about" class="d-flex flex-director">
          <v-card class="ma-2 pa-2 flex-grow-1">
            <v-card-title>{{ $t(block.fields.title) }}</v-card-title>
            <v-card-subtitle>{{ $t(block.fields.subtitle) }}</v-card-subtitle>
            <v-list lines="one" density="compact">
              <v-list-item v-for="skill in block.fields.skills" :key="skill.title" :title="skill.title"
                :subtitle="$t(skill.short_text)">
                <template v-slot:prepend>
                  <v-icon :icon="skill.icon"></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12" lg="4" md="6" class="d-flex flex-director" v-if="loading">
          <v-card class="ma-2 pa-2 flex-grow-1">
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
    </v-col>
  </v-row>
</template>
  
<script>
import myPhoto from '../assets/images/myPhoto.jpg'
import { reactive, computed, ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import { fetchContent } from '@/plugins/apiFunctions'
export default {
  data() {
    return {
      photo: myPhoto,
      age: ''
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
    const about = ref([])
    const loading = ref(false)
    const { t, locale } = useI18n()
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
      localizedExperiences,
      loading,
      about
    }
  }
}
</script>