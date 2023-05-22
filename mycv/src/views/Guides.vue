<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row class="ma-2">
        <v-col :cols="responsive.rightBar" :order="responsive.order" :class="responsive.showSticky">
          <v-card class="pa-4">
            <v-text-field clearable :label="$t('projects.searchbar')" variant="outlined"
              style="height: 100%;"></v-text-field>
            <v-chip-group v-model="searchText" selected-class="text-secondary" mandatory>
              <v-chip v-for="chip in chips" :key="chip.value" :value="chip.value">
                {{ chip.name }}
              </v-chip>
            </v-chip-group>
          </v-card>
        </v-col>

        <v-col :cols="responsive.leftBar">

          <v-card class="mb-6" height="450" v-if="noResults && !loading">
            {{ $t('errors.noResults') }}
          </v-card>

          <v-card class="mb-6" v-if="loading" align-self="center">
            <FetchError></FetchError>
          </v-card>

          <v-card class="mb-6" height="450" v-for="i in filteredGuides" :key="i">
            <v-img cover height="100" :src="i.fields.imageHeader.fields.file.url">
              <v-toolbar color="transparent">
                <template v-slot:prepend>
                  <v-btn icon="mdi-star"></v-btn>
                </template>
              </v-toolbar>
            </v-img>
            <div class="pa-4">
              <div class="text-h4">{{ i.fields.title }}</div>
              <div class="text-subtitle">{{ i.fields.category }}</div>
              <v-divider class="ma-2"></v-divider>
              <div class="text-body1 card-text">{{ i.fields.shortText }}</div>
            </div>
            <v-card-actions class="pa-2 ma-2">
              <router-link :to="{ name: 'The project', params: { slug: i.fields.slug } }">
                <v-btn class="px-5" prepend-icon="mdi-book-open" variant="tonal">Read</v-btn>
              </router-link>
              <v-btn class="px-5" prepend-icon="mdi-share" variant="tonal">Share</v-btn>
              <v-btn class="px-5" prepend-icon="mdi-eye" variant="flat" style="pointer-events: none;">10</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
  
<script>
import { useWindowSize } from 'vue-window-size'
import { computed, ref, onMounted } from 'vue'
import fetchContent from '@/plugins/apiFunctions'
import useSearch from "@/plugins/searchEngine"
import FetchError from '@/components/FetchError.vue'
export default {
  setup() {
    let windowWidth = useWindowSize().width // Composition API version of $windowWidth
    const responsive = computed(() => columnCalculator()) // Adapts view to the device width accordingly
    const loading = ref(false) // True when there is an error in fetching data from api. Also needed for future infinite scroll option
    const guides = ref([]) // API's answer with an array of guides
    const searchText = ref("") // v-model variable for search 

    const { filteredContent: filteredGuides } = useSearch(guides, searchText) // Search function
    const noResults = computed(() => filteredGuides.value.length === 0) // Shows card that says of empty search results

    function columnCalculator() {
      switch (true) {
        case windowWidth.value >= 1280:
          return { leftBar: 9, showSticky: 'sticky-col', rightBar: 3, order: 2 }
        default:
          return { leftBar: 12, showSticky: '', rightBar: 12, order: 0 }
      }
    }
    // Contentful API request 
    onMounted(async () => {
      try {
        guides.value = await fetchContent('guides', 'fields.title, fields.slug, fields.imageHeader, fields.category, fields.shortText')
      } catch (error) {
        loading.value = true
      }
    })
    return { responsive, loading, guides, searchText, filteredGuides, noResults }
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