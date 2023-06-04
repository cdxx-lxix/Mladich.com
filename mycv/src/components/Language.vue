<template>
    <v-btn @click="switchLanguage">
        <v-tooltip activator="parent" location="bottom" >{{ $t('appbar.tooltipLang') }}</v-tooltip>
        {{ lang }}
    </v-btn>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
export default {
  setup() {
    const lang = ref(localStorage.getItem('lang'))
    const { locale } = useI18n()

    function switchLanguage() {
      locale.value = locale.value === 'en' ? 'ru' : 'en'
      localStorage.setItem('lang', locale.value)
      lang.value = locale.value
      contentCheck(lang.value)
    }

    function contentCheck(value) {
        if (value === 'en') {
            localStorage.setItem('content', 'en-US')
      } else {
            localStorage.setItem('content', 'ru-RU')
      }
    }

    onBeforeMount(() => {
      if(localStorage.getItem('lang')) {
        locale.value = localStorage.getItem('lang')
        contentCheck(localStorage.getItem('lang'))
      } else {
        localStorage.setItem('lang', 'en')
        locale.value = localStorage.getItem('lang')
        lang.value = locale.value
        localStorage.setItem('content', 'en-US')
      }
    })

    return {
      lang,
      switchLanguage
    }
  }
}
</script>