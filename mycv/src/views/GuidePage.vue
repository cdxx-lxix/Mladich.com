<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-card class="ma-5" :loading="isLoading">
                <v-toolbar color="surface" density="comfortable" flat>
                    <v-tooltip :text="$t('guide.videoTooltip')" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn icon="custom:youtubeIcon" :disabled="guide.videoLink ? false : true" v-bind="props" :href="guide.videoLink"></v-btn>
                        </template>
                    </v-tooltip>
                    <v-toolbar-title class="text-h5">{{ guide.category }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div class="text-h6">{{ guide.creationDate }}</div>
                    <v-btn style="pointer-events: none;"><v-icon icon="mdi-calendar"></v-icon></v-btn>

                </v-toolbar>
                <v-img cover height="100" :src="headerImage"></v-img>
                <v-card-text>
                    <div class="font-weight-bold text-h4 mb-4">
                        {{ guide.title }}
                    </div>
                    <div class="text-body2 mb-4 richtext">
                        <p>{{ guide.shortText }}</p>
                    </div>
                    <div class="text-body2 mb-4 richtext" v-html="richText"></div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { fetchOne } from '@/plugins/apiFunctions'
export default {
    props: {
        slug: String
    },
    setup(props) {
        const guide = ref({})
        const richText = ref('')
        const headerImage = ref('')
        const isLoading = computed(() => guide.value.length === 0 ? true : false)
        const { t, locale } = useI18n()
        const fetcher = async () => {
            try {
                const fetched = await fetchOne('guides', props.slug)
                guide.value = fetched.contentBody
                richText.value = fetched.convertedText
                headerImage.value = guide.value.imageHeader.fields.file.url
            } catch (error) {
                console.log(error)
            }
        }
        watch(locale, fetcher, { immediate: true })
        onMounted(fetcher)

        watch(guide, () => {
            useHead({
                title: t('meta.thisguide_title') + guide.value.title,
                meta: [
                    {
                        name: 'description',
                        content: guide.value.shortText,
                    },
                    {
                        name: 'lang',
                        content: localStorage.getItem('lang')
                    }
                ],
            })
        }, { deep: true })

        return { richText, guide, headerImage, isLoading }
    }
}
</script>

<style scoped>
@import url(@/css/richtext.css);
</style>