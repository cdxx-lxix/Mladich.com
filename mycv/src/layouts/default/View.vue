<!-- eslint-disable vue/multi-word-component-names -->
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
  <v-navigation-drawer v-model="drawer" location="top" temporary style="height: 57px;">
    <v-layout class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation active>

        <v-btn @click="navigateTo('Home')">{{ $t('menu.home') }}</v-btn>

        <v-divider vertical />

        <v-btn @click="navigateTo('About me')">{{ $t('menu.aboutme') }}</v-btn>

        <v-btn @click="navigateTo('My projects')">{{ $t('menu.projects') }}</v-btn>

        <v-btn>{{ $t('menu.youtube') }}</v-btn>

        <v-btn @click="navigateTo('Guides')">{{ $t('menu.guides') }}</v-btn>

        <v-btn @click="navigateTo('Contacts')">{{ $t('menu.contacts') }}</v-btn>

      </v-bottom-navigation>
    </v-layout>
  </v-navigation-drawer>

  <!-- BODY -->
  <v-main>
    <router-view />
  </v-main>
</template>

<script>
import Language from '@/components/Language.vue';
import Theme from '@/components/Theme.vue';
import { ref } from 'vue';
export default {
  setup() {
    const drawer = ref(false);

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    return { drawer, toggleDrawer }
  },
  components: {
    Theme,
    Language
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    },
  },
}
</script>

<style>
/* Disables scrollbar and sets website's size */
  html {
    height: 100vh;
    width: 100vw;
    -ms-overflow-style: none; 
    scrollbar-width: none;
  }
  html::-webkit-scrollbar {
  display: none;
  }
</style>