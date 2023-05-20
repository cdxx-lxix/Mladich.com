<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-btn @click="switchLanguage">
        <v-tooltip activator="parent" location="bottom" >{{ $t('appbar.tooltipLang') }}</v-tooltip>
        {{ lang }}
    </v-btn>
</template>

<script>
    export default {
        data() {
            return {
                lang: localStorage.getItem('lang')
            }
        },
        methods: {
            // Detects user's desired language based on their browser settings if it fails switches to default setting - English
            // If their settings match with my supported languages then writes to localstorage and sets the i18n locale
            detectDesiredLanguage() {
                const userLang = navigator.languages.find(lang => this.$supportedLanguages.includes(lang))
                
                this.$i18n.locale = userLang || 'en'
                localStorage.setItem('lang', this.$i18n.locale)
                this.lang = this.$i18n.locale
            },
            // Button function to switch between languages and remember this setting
            switchLanguage() {
                this.$i18n.locale = this.$i18n.locale === 'en' ? 'ru' : 'en'
                localStorage.setItem('lang', this.$i18n.locale)
                this.lang = this.$i18n.locale
                if (this.lang === 'en') { // For contentful API
                    localStorage.setItem('content', 'en-US')
                } else {
                    localStorage.setItem('content', 'ru-RU')
                }
            },
            // If a user was on the website before then get the language setting if not it's attemp to determine preferred language. Default language: English.
            detectLanguage() {
                this.$i18n.locale = localStorage.getItem('lang') ?? this.detectDesiredLanguage()
            }
        },
        beforeMount() {
            this.detectLanguage()
        }
    }
</script>