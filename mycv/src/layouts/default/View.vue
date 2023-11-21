<template>
  <!-- APPBAR -->
  <v-app-bar :elevation="3">
    <template v-slot:prepend>
      <v-tooltip :text="$t('appbar.tooltipMenu')" location="bottom" v-if="menuLogic(name, currentRouteName).drawer">
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon icon="mdi-menu" @click="toggleDrawer" v-bind="props"></v-app-bar-nav-icon>
        </template>
      </v-tooltip>

      <v-app-bar-nav-icon v-else>
        <v-app-bar-nav-icon icon="mdi-application-braces"></v-app-bar-nav-icon>
      </v-app-bar-nav-icon>

      <v-app-bar-title>{{ $t('appbar.title') }}</v-app-bar-title>
    </template>

    <v-tabs v-show="menuLogic(name, currentRouteName).menu" v-model="page" color="primary" align-tabs="center">
      <v-tab value="/" @click="navigateTo('Home')">{{ $t('menu.home') }}</v-tab>
      <v-tab v-for="item in menuItems" :value="item.model" @click="navigateTo(item.route)">{{ $t(item.name) }}</v-tab>
    </v-tabs>

    <template v-slot:append>
      <v-btn-group divided>
        <theme />
        <language />
      </v-btn-group>
    </template>
  </v-app-bar>

  <!-- NAVIGATION -->
  <v-navigation-drawer v-model="drawer" location="top" temporary style="height: 57px;" v-if="width >= 1280">
    <v-layout style="height: 56px;">
      <v-bottom-navigation active>
        <v-btn @click="navigateTo('Home')">{{ $t('menu.home') }}</v-btn>
        <v-divider vertical />
        <v-btn v-for="menuItem in menuItems" :key="menuItem.name" @click="navigateTo(menuItem.route)">{{ $t(menuItem.name)
        }}</v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-navigation-drawer>

  <v-navigation-drawer v-model="drawer" location="top" temporary v-else style="height: 330px;">
    <v-list nav class="text-center">
      <v-list-item @click="navigateTo('Home')">{{ $t('menu.home') }}</v-list-item>
      <v-list-item v-for="menuItem in menuItems" :key="menuItem.name" @click="navigateTo(menuItem.route)">{{
        $t(menuItem.name) }}</v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- BODY -->
  <v-main v-model="page" :value="currentRouteName">
    <router-view />
  </v-main>
</template>

<script>
import Language from '@/components/Language.vue'
import Theme from '@/components/Theme.vue'
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router';
export default {
  setup() {
    const drawer = ref(false)
    const { width, name } = useDisplay()
    const route = useRoute()
    const currentRouteName = computed(() => route.path)
    const page = ref(currentRouteName)
    const menuItems = ref([
      { route: 'About me', name: 'menu.aboutme', model: "/about-me" },
      { route: 'My projects', name: 'menu.projects', model: "/projects" },
      { route: 'Youtube', name: 'menu.youtube', model: "/youtube" },
      { route: 'Guides', name: 'menu.guides', model: "/guides" },
      { route: 'Contacts', name: 'menu.contacts', model: "/contacts" }
    ])

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    }

    const menuLogic = (breakpoint, route) => {
      switch (true) {
        case route === '/':
          // No top menu, no drawer and the icon is braces on Home page
          return { menu: false, drawer: false}
        case breakpoint === 'xs':
        case breakpoint === 'sm':
        case breakpoint === 'md':
          // On smaller screens starting with tables no top menu and the icon is burger
          return { menu: false, drawer: true}
        case breakpoint === 'lg':
        case breakpoint === 'xl':
        case breakpoint === 'xxl':
        default: 
          // On bigger screens and by default top menu is on, icon is braces and the drawer is disabled
          return { menu: true, drawer: false}
      }
    }

    return { drawer, toggleDrawer, menuItems, width, name, /* name is breakpoint from Vuetify */ currentRouteName, page, menuLogic }
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