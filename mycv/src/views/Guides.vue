<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row class="ma-2">
        <v-col cols="12" lg="3" :order="width >= 1280 ? 2 : 0" :class="width >= 1280 ? 'sticky-col' : ''">
          <v-card class="pa-4">
            <v-text-field v-model="searchText" clearable :label="$t('projects.searchbar')" variant="outlined"
              style="height: 100%;"></v-text-field>
            <v-chip-group v-model="searchText" selected-class="text-secondary" mandatory>
              <v-chip v-for="chip in chips" :key="chip.value" :value="chip.value">
                {{ chip.name }}
              </v-chip>
            </v-chip-group>
          </v-card>
        </v-col>

        <v-col cols="12" lg="9">

          <v-card class="mb-6" height="450" v-if="noResults && !loading">
            <v-sheet height="100%" tile>
              <div class="d-flex fill-height justify-center align-center">
                <div class="d-flex fill-height justify-center align-center">
                  <v-icon class="mb-5" color="error" icon="mdi-alert-circle" size="112"></v-icon>
                  <h2 class="text-h5 mb-6">{{ $t('errors.noResults') }}</h2>
                </div>
              </div>
            </v-sheet>
          </v-card>

          <v-card class="mb-6" v-if="loading" align-self="center">
            <FetchError></FetchError>
          </v-card>

          <v-card class="mb-6" height="450" v-for="i in filteredGuides" :key="i">
            <v-img cover height="100" :src="i.fields.imageHeader.fields.file.url">
              <v-toolbar color="transparent">
                <template v-slot:prepend>
                  <v-btn @click="useShare(i.fields.slug, i.fields.title)" icon="mdi-share-variant"></v-btn>
                </template>
                <v-toolbar-title>{{ i.fields.creationDate }}</v-toolbar-title>
              </v-toolbar>
            </v-img>
            <div class="pa-4">
              <div class="text-h4">{{ i.fields.title }}</div>
              <div class="text-subtitle">{{ i.fields.category }}</div>
              <v-divider class="ma-2"></v-divider>
              <div class="text-body1 card-text">{{ i.fields.shortText }}</div>
            </div>
            <v-card-actions class="pa-2 ma-2">
              <router-link :to="{ name: 'The guide', params: { slug: i.fields.slug } }">
                <v-btn class="px-5" prepend-icon="mdi-book-open" variant="tonal">Read</v-btn>
              </router-link>
              <v-btn class="px-5" prepend-icon="mdi-eye" variant="flat" style="pointer-events: none;">10</v-btn>
            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
  
<script>
import { computed, ref, onMounted } from 'vue'
import { fetchContent } from '@/plugins/apiFunctions'
import useSearch from "@/plugins/searchEngine"
import { useShare } from '@/plugins/share'
import FetchError from '@/components/FetchError.vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'
export default {
  setup() {
    const loading = ref(false) // True when there is an error in fetching data from api. Also needed for future infinite scroll option
    const guides = ref([]) // API's answer with an array of guides
    const searchText = ref("") // v-model variable for search 
    const { width } = useDisplay()
    const { filteredContent: filteredGuides } = useSearch(guides, searchText) // Search function
    const noResults = computed(() => filteredGuides.value.length === 0) // Shows card that says of empty search results

    // Contentful API request 
    onMounted(async () => {
      try {
        guides.value = await fetchContent('guides', 'fields.title, fields.slug, fields.imageHeader, fields.category, fields.shortText, fields.creationDate')
      } catch (error) {
        loading.value = true
      }
    })
    const { t } = useI18n()
    useHead({
      title: t('menu.guides'),
      meta: [
        {
          name: 'description',
          content: t('meta.guides_desc'),
        },
        {
          name: 'lang',
          content: localStorage.getItem('lang')
        }
      ],
    })
    return { loading, guides, searchText, filteredGuides, noResults, useShare, width }
  },
  components: {
    FetchError
  },
  data() {
    return {
      chips: {
        one: { name: 'All', value: '' },
        two: { name: 'Vue', value: 'Vue' },
        three: { name: 'Wordpress', value: 'Wordpress' },
        four: { name: 'Javascript', value: 'Javascript' },
        five: { name: 'PHP', value: 'PHP' },
        six: { name: 'Server-side', value: 'Server-side' },
        seven: { name: 'Frameworks', value: 'Frameworks' },
        eight: { name: 'CSS & HTML', value: 'CSS\\HTML' }
      }
    }
  }
}
</script>

<style scoped>
.sticky-col {
  position: fixed;
  right: 0px
}

.card-text {
  line-height: 1.5em;
  max-height: 450px;
  /* Adjust this value to your desired height */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  /* Adjust this value to the number of lines you want to show */
  -webkit-box-orient: vertical;
}
</style>