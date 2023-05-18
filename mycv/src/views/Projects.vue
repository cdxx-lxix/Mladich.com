<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row class="ma-2">
        <v-col :cols="columns" style="width: 100%;" v-for="i in projects" :key="i">
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
                <v-btn color="primary" variant="text"> Read more </v-btn>
              </router-link>
              <v-spacer />
              <v-icon :icon="i.fields.projectIcon"></v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div cols="12" class="ma-5" v-if="loading">
        <v-progress-linear color="secondary" indeterminate></v-progress-linear>
      </div>
    </v-col>

  </v-row>
</template>
  
<script>
import { ref, computed, onMounted } from "vue"
import { useWindowSize } from 'vue-window-size'
import client from '@/plugins/contentful'
export default {
  setup() {
    const columns = computed(() => columnCalculator())
    const loading = ref(false)
    const projects = ref([])
    let windowWidth = useWindowSize().width

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
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'project',
          select: 'fields.title,fields.slug,fields.previewImage,fields.category,fields.projectIcon'
        })
        projects.value = response.items
      } catch (error) {
        console.error(error)
      }
    }
    onMounted(fetchProjects)

    return { columns, loading, projects }
  },
}
</script>
  