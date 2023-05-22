<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row class="ma-2">

        <v-col cols="12" v-if="!responsive.showSticky">
          <v-card class="pa-4">
            <v-text-field clearable :label="$t('projects.searchbar')" variant="outlined"
              style="height: 100%;"></v-text-field>
            <v-chip-group v-model="categorySelection" selected-class="text-secondary" mandatory>
              <v-chip value="">
                All
              </v-chip>
              <v-chip value="vue">
                Vue
              </v-chip>
              <v-chip value="frameworks">
                Frameworks
              </v-chip>
              <v-chip value="wordpress">
                Wordpress
              </v-chip>
              <v-chip value="server-side">
                Server-side
              </v-chip>
              <v-chip value="javascript">
                Javascript
              </v-chip>
            </v-chip-group>
          </v-card>
        </v-col>

        <v-col :cols="responsive.columns">
          <v-card class="mb-6" height="450" v-for="i in filteredGuides" :key="i">
            <v-img cover height="100" :src="i.fields.imageHeader.fields.file.url">
              <v-toolbar color="transparent">
                <template v-slot:prepend>
                  <v-btn icon="mdi-star"></v-btn>
                </template>
              </v-toolbar>
            </v-img>
            <v-container>
              <div class="text-h4">{{ i.fields.title }}</div>
              <div class="text-subtitle">{{ i.fields.category }}</div>
              <v-divider class="ma-2"></v-divider>
              <div class="text-body1 card-text">{{ i.fields.shortText }}</div>
            </v-container>
            <v-card-actions class="pa-2 ma-2">
              <router-link :to="{ name: 'The project', params: { slug: i.fields.slug } }">
                <v-btn class="px-5" prepend-icon="mdi-book-open" variant="tonal">Read</v-btn>
              </router-link>
              <v-btn class="px-5" prepend-icon="mdi-share" variant="tonal">Share</v-btn>
              <v-btn class="px-5" prepend-icon="mdi-eye" variant="flat" style="pointer-events: none;">10</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="3" class="sticky-col" v-if="responsive.showSticky">
          <v-card class="pa-4">
            <v-text-field clearable :label="$t('projects.searchbar')" variant="outlined"
              style="height: 100%;"></v-text-field>
          </v-card>
          <v-card class="pa-4 mt-6">
            <v-card-title class="text-center">Categories</v-card-title>
            <v-list density="compact">
              <v-list-item active-color="primary" value="Cat - 1">
                <v-list-item-title>Cat - 1</v-list-item-title>
              </v-list-item>
              <v-list-item active-color="primary" value="Cat - 1">
                <v-list-item-title>Cat - 2</v-list-item-title>
              </v-list-item>
              <v-list-item active-color="primary" value="Cat - 1">
                <v-list-item-title>Cat - 3</v-list-item-title>
              </v-list-item>
              <v-list-item active-color="primary" value="Cat - 1">
                <v-list-item-title>Cat - 4</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

      </v-row>
    </v-col>
  </v-row>
</template>
  
<script>
import { useWindowSize } from 'vue-window-size'
import { computed, ref, onMounted } from 'vue'
import client from '@/plugins/contentful'
export default {
  setup() {
    let windowWidth = useWindowSize().width // Composition API version of $windowWidth
    const responsive = computed(() => columnCalculator()) // Adapts view to the device width accordingly
    function columnCalculator() {
      switch (true) {
        case windowWidth.value >= 1280:
          return { columns: 9, showSticky: true }
        default:
          return { columns: 12, showSticky: false }
      }
    }
    const categorySelection = ref('')
    const loading = ref(false) // True when there is an error in fetching data from api. Also needed for future infinite scroll option
    const guides = ref([]) // API's answer with an array of guides
    const searchText = ref("") // v-model variable for search 
        // Filters project based on the searchbar input and removes unmatched cards.
        const filteredGuides = computed(() => {
      if (!searchText.value) return guides.value
      return guides.value.filter(guide => guide.fields.title.toLowerCase().includes(searchText.value.toLowerCase())
        || guide.fields.category.toLowerCase().includes(searchText.value.toLowerCase()))
    })
    // Contentful API request 
    const fetchGuides = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'guides',
          select: 'fields.title, fields.slug, fields.imageHeader, fields.category, fields.shortText',
          locale: localStorage.getItem('content')
        })
        guides.value = response.items
      } catch (error) {
        console.error(error)
        loading.value = true
      }
    }
    onMounted(fetchGuides)
    return { responsive, categorySelection, loading, guides, searchText, filteredGuides }
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