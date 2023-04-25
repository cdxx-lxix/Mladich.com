// Pinia - global app storage. 
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    currentUsersTheme: localStorage.getItem('theme')
  }),
  actions: {
    setCurrentTheme(theme) {
      this.currentUsersTheme = theme
    }
  },
})
