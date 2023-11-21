<template>
  <v-row class="d-flex justify-space-evenly" :class="decorator.background, reactor.rowClass">
    <v-sheet v-for="menuItem in menuItems" :key="menuItem.id" class="flex-grow-1 flex-shrink-0 h-screen"
      :class="decorator.sheets, reactor.sheetsClass"
      @click="navigateTo(menuItem.route)" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5 flex flex-director" align="center" justify="center">
          <v-icon v-if="reactor.icons" :icon="menuItem.icon"></v-icon>
          <div class="no-selection">{{ $t(menuItem.text) }}</div>
        </v-row>
      </v-container>
    </v-sheet>
  </v-row>
</template>

<script>
import { ref, computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import corpDark from '@/assets/CorporationDark.svg'
import corpLight from '@/assets/CorporationLight.svg'
export default {
  setup() {
    const router = useRouter()
    const store = useAppStore()
    const currentTheme = computed(() => store.currentUsersTheme)
    const decorator = computed(() => reactToTheme())
    const reactor = computed(() => reactToDevice())
    const { width } = useDisplay()
    const lightbg = `url(${corpLight})`
    const darkbg = `url(${corpDark})`
    const navigateTo = (route) => {
      router.push({ name: route })
    }

    function reactToTheme() {
      switch(true) {
        case currentTheme.value === 'dark':
          return { sheets: 'transparent-sheet', background: 'my-background-dark' }
        default:
          return { sheets: 'transparent-sheetLight', background: 'my-background-light' }
      }
    }
    function reactToDevice() {
      switch(true) {
        case width.value >= 1280:
          return { sheetsClass: 'custom-col', rowClass: 'my-background', icons: true }
        default:
          return { sheetsClass: 'custom-row', rowClass: 'my-background-mobile', icons: false }
      }
    }

    const handleMouseOver = (event) => {
      const parentElement = event.target;
      if (parentElement.children.length > 0) {
        const divText = parentElement.querySelector('.no-selection')
        divText.classList.add('hoveredOver')
        // This if needs to exist because on mobiles and tablets there are no icons and the console becomes bloated with errors.
        if (width.value >= 1280) {
          parentElement.querySelector('.mdi').classList.add('v-icon--size-x-large')
        }
      }
    }

    const handleMouseOut = (event) => {
      const parentElement = event.target;
      if (parentElement.children.length > 0) {
        const divText = parentElement.querySelector('.no-selection')
        divText.classList.remove('hoveredOver')
        if (width.value >= 1280) {
          parentElement.querySelector('.mdi').classList.remove('v-icon--size-x-large')
        }
      }
    }

    const { t } = useI18n()
    useHead({
      title: t('meta.home_title'),
      meta: [
        {
          name: 'description',
          content: t('meta.home_desc'),
        },
        {
          name: 'lang',
          content: localStorage.getItem('lang')
        }
      ],
    })

    const menuItems = ref([
      { id: 1, icon: 'mdi-account', text: 'menu.aboutme', route: 'About me' },
      { id: 2, icon: 'mdi-projector-screen', text: 'menu.projects', route: 'My projects' },
      { id: 3, icon: 'mdi-video', text: 'menu.youtube', route: 'Youtube' },
      { id: 4, icon: 'mdi-television-guide', text: 'menu.guides', route: 'Guides' },
      { id: 5, icon: 'mdi-card-account-mail', text: 'menu.contacts', route: 'Contacts' }
    ])


    return {
      currentTheme,
      navigateTo,
      handleMouseOver,
      handleMouseOut,
      menuItems,
      decorator,
      reactor,
      lightbg,
      darkbg
    }
  },
}
</script>

<style scoped>
.custom-col {
  flex: 1 0 20%;
  max-width: 20%;
  height: calc(100vh - 57px) !important;
}

.custom-row {
  flex: 0 1 100%;
  max-width: 100%;
  max-height: 20%;
}

.transparent-sheet {
  /* opacity: 0.4; */
  background-color: #161616a6;
  border-right: #000000a6 2px solid;
  cursor: pointer;
}

.transparent-sheet:hover {
  /* opacity: 1 !important; */
  background: #212121a3;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.transparent-sheetLight {
  /* opacity: 0.4; */
  background-color: #FFFFFFa6;
  border-right: #000000a6 2px solid;
  cursor: pointer;
}

.transparent-sheetLight:hover {
  /* opacity: 1 !important; */
  background: #676767a3;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.my-background-dark {
  background-image: v-bind(lightbg);
}
.my-background-light {
  background-image: v-bind(darkbg);
}
.my-background {
  background-position: center;
  height: 100%;
  width: 101vw;
}

.my-background-mobile {
  background-position: center;
  height: calc(100vh - 57px) !important;
  width: 101vw;
}

.no-selection {
  user-select: none;
  text-shadow: -0.01em -0.01em 0.01em
}

.hoveredOver {
  font-size: larger;
}
</style>
