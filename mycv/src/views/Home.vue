<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row class="d-flex justify-space-evenly my-background">
    <v-sheet class="flex-grow-1 flex-shrink-0 h-screen custom-col" :class="currentTheme === 'dark' ? 'transparent-sheet' : 'transparent-sheetLight'" @click="navigateTo('About me')" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5" align="center" justify="center">
          <div class="no-selection">{{ $t('menu.aboutme') }}</div>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="flex-grow-1 flex-shrink-0 h-screen custom-col" :class="currentTheme === 'dark' ? 'transparent-sheet' : 'transparent-sheetLight'" @click="navigateTo('My projects')" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5" align="center" justify="center">
          <div class="no-selection">{{ $t('menu.projects') }}</div>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="flex-grow-1 flex-shrink-0 h-screen custom-col" :class="currentTheme === 'dark' ? 'transparent-sheet' : 'transparent-sheetLight'"  @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5" align="center" justify="center">
          <div class="no-selection">{{ $t('menu.youtube') }}</div>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="flex-grow-1 flex-shrink-0 h-screen custom-col" :class="currentTheme === 'dark' ? 'transparent-sheet' : 'transparent-sheetLight'" @click="navigateTo('Guides')" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5" align="center" justify="center">
          <div class="no-selection">{{ $t('menu.guides') }}</div>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="flex-grow-1 flex-shrink-0 h-screen custom-col" :class="currentTheme === 'dark' ? 'transparent-sheet' : 'transparent-sheetLight'" @click="navigateTo('Contacts')" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5" align="center" justify="center">
          <div class="no-selection">{{ $t('menu.contacts') }}</div>
        </v-row>
      </v-container>
    </v-sheet>
  </v-row>
</template>

<script>
import { computed } from 'vue';
import { useAppStore } from '@/store/app';
export default {
  methods: {
    // I did it to avoid using <router-link> and screw my already set html&css
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    handleMouseOver(event) {
      const parentElement = event.target;
      if (parentElement.children.length > 0) {
        const targetChildElement = parentElement.querySelector('.no-selection')
        targetChildElement.classList.add('hoveredOver')
      }
    },
    handleMouseOut(event) {
      const parentElement = event.target;
      if (parentElement.children.length > 0) {
        const targetChildElement = parentElement.querySelector('.no-selection')
        targetChildElement.classList.remove('hoveredOver')
      }
    }
  },
  setup() {
    // Retrieve value from global storage to change my v-sheets and other things accordingly
    const store = useAppStore()
    const currentTheme = computed(() => store.currentUsersTheme);

    return {
      currentTheme
    }
  }
}
</script>

<style scoped>
  .custom-col {
    flex: 1 0 20%;
    max-width: 20%;
  }
.transparent-sheet {
  background: rgba(21, 21, 21, 0.4);
    background-blend-mode: overlay;
    /* opacity: 0.4 !important; */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    border-right: #000000a6 2px solid;
    cursor: pointer;
  }
  .transparent-sheet:hover {
    /* opacity: 0.6 !important; */
    background: rgba(21, 21, 21, 0.6);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  .transparent-sheetLight {
  background: rgba(168, 168, 168, 0.4);
    background-blend-mode: overlay;
    /* opacity: 0.4 !important; */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    border-right: #000000a6 2px solid;
    cursor: pointer;
  }
  .my-background {
    background-image: URL('src/assets/CorporationLight.svg');
    background-position: center;
    height: 100%;
    width: 100%;
  }
  .no-selection {
    user-select: none;
    text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ffffff, 0 0 20px #ffffff;

  }
  .hoveredOver {
    font-size: larger;
  }
</style>
