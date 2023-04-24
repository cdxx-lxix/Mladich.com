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

    export default {
        setup () {
            const theme = useTheme()
            const toggleTheme = () => {
                theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
                localStorage.setItem('theme', theme.global.name.value)
            }
            onMounted(() => {
                if (localStorage.getItem('theme')) {
                    theme.global.name.value = localStorage.getItem('theme')
                }
            })

            return {
                theme, 
                toggleTheme
            }
        }
    }
</script>