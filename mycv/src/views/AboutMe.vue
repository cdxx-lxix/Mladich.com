<template>
  <v-container>
    <v-row>
      <v-card>
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
          <div >{{ $t('aboutme.c1_citizen') }}</div>
          <div >{{ $t('aboutme.c1_location') }}</div>
          <v-divider :thickness="5" class="border-opacity-25 my-2" />
          <div class="text-subtitle-2">{{ $t('aboutme.c1_text', { years: age }) }}</div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
  
<script>
import myPhoto from '../assets/images/myPhoto.jpg'
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
  }
}
</script>
