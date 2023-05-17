<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row class="ma-2">
        <v-col :cols="columns" style="width: 100%;" v-for="i in blocks" :key="i">
          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img>
            <v-card-title>
              window width: {{ $windowWidth }}
            </v-card-title>
            <v-card-subtitle>
              columns: {{ columns }}
            </v-card-subtitle>
            <v-card-actions>
              <router-link :to="{ name: 'The project', params: { slug: i}}">
                <v-btn color="primary" variant="text"> Read more </v-btn>
              </router-link>
              <v-spacer />
              <v-icon icon="mdi-chevron-up"></v-icon>
              <v-icon icon="mdi-chevron-up"></v-icon>
              <v-icon icon="mdi-chevron-up"></v-icon>
              <v-icon icon="mdi-chevron-up"></v-icon>
              <v-icon icon="mdi-chevron-up"></v-icon>
              <v-icon icon="mdi-chevron-up"></v-icon>
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
import { ref, computed } from "vue"
import { useWindowSize } from 'vue-window-size'
export default {
  setup() {
    const blocks = ref(8)
    const columns = computed(() => columnCalculator())
    const loading = ref(false)
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

    return { blocks, columns, loading }
  },
}
</script>
  