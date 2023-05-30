<template>
  <!-- APPBAR -->
  <v-app-bar :elevation="3">
    <template v-slot:prepend>
      <v-tooltip :text="$t('appbar.tooltipMenu')" location="bottom">
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon icon="mdi-application-braces" @click="toggleDrawer" v-bind="props"></v-app-bar-nav-icon>
        </template>
      </v-tooltip>
      
      <v-app-bar-title>{{ $t('appbar.title') }}</v-app-bar-title>
    </template>

    <template v-slot:append>
      <v-btn-group divided>
        <theme />
        <language />
      </v-btn-group>
    </template>
  </v-app-bar>

  <!-- NAVIGATION -->
  <v-navigation-drawer v-model="drawer" location="top" temporary style="height: 57px;" v-if="$windowWidth >= 1280">
    <v-layout style="height: 56px;">
      <v-bottom-navigation active>
        <v-btn @click="navigateTo('Home')">{{ $t('menu.home') }}</v-btn>
        <v-divider vertical />
        <v-btn v-for="menuItem in menuItems" :key="menuItem.name" @click="navigateTo(menuItem.route)">{{ $t(menuItem.name) }}</v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-navigation-drawer>

  <v-navigation-drawer v-model="drawer" location="top" temporary v-else style="height: 330px;">
        <v-list nav class="text-center">
          <v-list-item @click="navigateTo('Home')">{{ $t('menu.home') }}</v-list-item>
          <v-list-item v-for="menuItem in menuItems" :key="menuItem.name" @click="navigateTo(menuItem.route)">{{ $t(menuItem.name) }}</v-list-item>
        </v-list>
  </v-navigation-drawer>

  <!-- BODY -->
  <v-main>
    <router-view />
  </v-main>
</template>

<script>
import Language from '@/components/Language.vue'
import Theme from '@/components/Theme.vue'
import { ref } from 'vue'
export default {
  setup() {
    const drawer = ref(false)
    const menuItems = ref([
      { route: 'About me', name: 'menu.aboutme' },
      { route: 'My projects', name: 'menu.projects' },
      { route: 'Youtube', name: 'menu.youtube' },
      { route: 'Guides', name: 'menu.guides' },
      { route: 'Contacts', name: 'menu.contacts' }
  ])

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    }

    return { drawer, toggleDrawer, menuItems }
  },
  components: {
    Theme,
    Language
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route })
    },
  },
}
</script>

<style>
/* Makes columns of equal height along with vuetify's d-flex */
.flex-director {
  flex-direction: column
}
</style>