<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row class="ma-2" justify="center" style="height: 80px;">
        <v-col :cols="$windowWidth >= 1280 ? 6 : 12" style="margin: inherit;">
          <v-text-field v-model="searchText" clearable :label="$t('projects.searchbar')" variant="outlined"
            style="height: 100%;"></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <FetchError v-if="loading"></FetchError>
    <v-col cols="12">
      <v-row class="ma-2">
        <v-col cols="12" v-if="noResults && !loading" class="text-center">
          {{ $t('errors.noResults') }}
        </v-col>
        <v-col :cols="columns" style="width: 100%;" v-for="i in filteredProjects" :key="i">
          <v-card>
            <v-img :src="i.fields.previewImage.fields.file.url" height="200px" cover></v-img>
            <v-card-title>
              {{ i.fields.title }}
            </v-card-title>
            <v-card-subtitle>
              {{ i.fields.category }}
            </v-card-subtitle>
            <v-card-actions>
              <router-link :to="{ name: 'The project', params: { slug: i.fields.slug } }">
                <v-btn color="primary" variant="text">{{ $t('projects.readmore') }}</v-btn>
              </router-link>
              <v-spacer />
              <v-icon :icon="i.fields.projectIcon"></v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
  
<script>
import { ref, computed, onMounted } from "vue"
import { useWindowSize } from 'vue-window-size'
import fetchContent from '@/plugins/apiFunctions'
import useSearch from "@/plugins/searchEngine"
import FetchError from '@/components/FetchError.vue'
export default {
  setup() {
    const columns = computed(() => columnCalculator()) // Adapting the page for proper view on various device width's
    const loading = ref(false) // True when there is an error in fetching data from api. Also needed for future infinite scroll option
    const searchText = ref('') // Search query from v-model
    const projects = ref([]) // Array of projects from the API
    let windowWidth = useWindowSize().width // Composition API version of $windowWidth
 
    const { filteredContent: filteredProjects } = useSearch(projects, searchText) // Search 
    const noResults = computed(() => filteredProjects.value.length === 0) // Shows card that says of empty search results

    function columnCalculator() {
      switch (true) {
        case windowWidth.value >= 2400:
          return 2
        case windowWidth.value >= 1920:
          return 3
        case windowWidth.value >= 1280:
          return 4
        case windowWidth.value >= 780:
          return 6
        default:
          return 12
      }
    }
    // Contentful API request 
    onMounted(async () => {
        try {
          projects.value = await fetchContent('project', 'fields.title,fields.slug,fields.previewImage,fields.category,fields.projectIcon')
        } catch (error) {
          loading.value = true
        }
      })
    return { columns, loading, projects, searchText, filteredProjects, noResults }
  },
  components: {
    FetchError
  }
}
</script>
  