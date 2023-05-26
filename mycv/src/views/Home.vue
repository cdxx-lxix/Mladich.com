<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row class="d-flex justify-space-evenly my-background">
    <v-sheet v-for="menuItem in menuItems" :key="menuItem.id" class="flex-grow-1 flex-shrink-0 h-screen custom-col"
      :class="currentTheme === 'dark' ? 'transparent-sheet' : 'transparent-sheetLight'"
      @click="navigateTo(menuItem.route)" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5 flex" align="center" justify="center" style="flex-direction: column;">
          <v-icon :icon="menuItem.icon"></v-icon>
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

export default {
  setup() {
    const router = useRouter()
    const navigateTo = (route) => {
      router.push({ name: route })
    }

    const handleMouseOver = (event) => {
      const parentElement = event.target;
      if (parentElement.children.length > 0) {
        const divText = parentElement.querySelector('.no-selection')
        const icon = parentElement.querySelector('.mdi')
        divText.classList.add('hoveredOver')
        icon.classList.add('v-icon--size-x-large')
      }
    }

    const handleMouseOut = (event) => {
      const parentElement = event.target;
      if (parentElement.children.length > 0) {
        const divText = parentElement.querySelector('.no-selection')
        const icon = parentElement.querySelector('.mdi')
        divText.classList.remove('hoveredOver')
        icon.classList.remove('v-icon--size-x-large')
      }
    }

    const store = useAppStore()
    const currentTheme = computed(() => store.currentUsersTheme)
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

    const iconSize = ref('')

    return {
      currentTheme,
      navigateTo,
      handleMouseOver,
      handleMouseOut,
      menuItems,
      iconSize
    }
  },
}
</script>

<style>
.custom-col {
  flex: 1 0 20%;
  max-width: 20%;
  height: 95vh !important;
}

.transparent-sheet {
  opacity: 0.4;
  border-right: #000000a6 2px solid;
  cursor: pointer;
}

.transparent-sheet:hover {
  opacity: 1 !important;
  background: rgba(21, 21, 21, 0.6);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.transparent-sheetLight {
  opacity: 0.4;
  border-right: #000000a6 2px solid;
  cursor: pointer;
}

.transparent-sheetLight:hover {
  opacity: 1 !important;
  background: rgba(204, 203, 203, 0.6);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.my-background {
  background-image: var(--themedBackground);
  background-position: center;
  height: 100%;
  width: 101vw;
}

.no-selection {
  user-select: none;
  text-shadow: -0.01em -0.01em 0.01em
}

.hoveredOver {
  font-size: larger;
}</style>
