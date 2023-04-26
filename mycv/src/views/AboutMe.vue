<template>
  <v-container class="about">
    <v-row>
      <v-card class="card ma-5">
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
      <v-card class="card ma-5">
        <v-card-item>
          <v-card-title>{{ $t('aboutme.c2_title') }}</v-card-title>
        </v-card-item>
        <v-timeline density="compact" align="start" class="mx-5" side="end">
          <v-timeline-item v-for="(exp, index) in experiences" :key="index" dot-color="indigo-accent-4"
            :icon="$t('experience.' + exp + '.icon')">

            <div class=" headline font-weight-light ">
              {{ $t('experience.' + exp + '.name') }}
            </div>
            <div class="subtitle  headline font-weight-light ">
              {{ $t('experience.' + exp + '.workTime') }}
            </div>
            <div class="text-caption">
              {{ $t('experience.' + exp + '.duties') }}
            </div>

          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-row>
  </v-container>
</template>
  
<script>
import myPhoto from '../assets/images/myPhoto.jpg'
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
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
    const { t } = useI18n()
    const experiences = reactive(['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'])
    const localizedExperiences = computed(() => {
      return experiences.map(exp => t('experience.' + exp))
    })

    return {
      experiences,
      localizedExperiences
    }
  }
}
</script>

<style>
.about {
  width: 100%;
  min-width: 100%;
}

.card {
  width: 33%
}
</style>