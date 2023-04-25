<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-btn @click="toggleTheme">
        {{ theme.global.current.value.dark ? $t('appbar.themeDark') : $t('appbar.themeLight') }}
        <v-tooltip activator="parent" location="bottom" >{{ $t('appbar.tooltipTheme') }}</v-tooltip>
    </v-btn>
</template>

<script>
    import { useTheme } from 'vuetify'
    import { onMounted } from 'vue'
    import { useAppStore } from '@/store/app'
    import { computed } from 'vue'

    export default {
        setup () {
            const theme = useTheme()
            const store = useAppStore()
            let backgroundCheck = computed(() => localStorage.getItem('theme') === 'dark' ? "url('src/assets/CorporationLight.svg')" : "url('src/assets/CorporationDark.svg')")
            const toggleTheme = () => {
                theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
                localStorage.setItem('theme', theme.global.name.value)
                store.setCurrentTheme(theme.global.name.value) // Passes this value to the global storage so my components with custom CSS can react to the theme changes
                document.querySelector(':root').style.setProperty('--themedBackground', theme.global.current.value.dark ? "url('src/assets/CorporationLight.svg')" : "url('src/assets/CorporationDark.svg')")
            }
            onMounted(() => {
                if (localStorage.getItem('theme')) {
                    theme.global.name.value = localStorage.getItem('theme')
                }
                document.querySelector(':root').style.setProperty('--themedBackground', backgroundCheck.value)
            })

            return {
                theme, 
                toggleTheme
            }
        }
    }
</script>

<style>
    :root {
        --themedBackground: url('src/assets/CorporationLight.svg');
    }
</style>