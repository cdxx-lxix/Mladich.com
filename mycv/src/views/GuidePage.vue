<template>
    <v-row>
        <v-col cols="12">
            <v-card class="ma-5" :loading="isLoading">
                <v-toolbar color="surface" density="comfortable" flat>
                    <v-tooltip :text="$t('guide.videoTooltip')" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn icon="custom:youtubeIcon" v-bind="props" :href="guide.videoLink"></v-btn>
                        </template>
                    </v-tooltip>
                    <v-toolbar-title class="text-h5">{{ guide.category }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div class="text-h6 mr-4">{{ guide.creationDate }}</div>
                </v-toolbar>
                <v-img cover height="100" :src="headerImage"></v-img>
                <v-card-text>
                    <div class="font-weight-bold text-h4 mb-4">
                        {{ guide.title }}
                    </div>
                    <div class="text-body1 mb-4">
                        {{ guide.shortText }}
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
        onMounted(async () => {
            try {
                const fetched = await fetchOne('guides', props.slug)
                guide.value = fetched.contentBody
                richText.value = fetched.convertedText
                headerImage.value = guide.value.imageHeader.fields.file.url
            } catch (error) {
                console.log(error)
            }
        })

        const { t } = useI18n()
        watch(guide, () => {
            useHead({
                title: t('meta.thisproject_title') + guide.value.title,
                meta: [
                    {
                        name: 'description',
                        content: richText.value,
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
.richtext >>> p {
    padding: 10px;
}

.richtext >>> blockquote {
    margin-top: 10px;
    margin-bottom: 10px;
    border-style: double double double solid;
    border-left: 9px solid;
    padding-left: 8px;
}

.richtext >>> p code {
    scrollbar-color: #666 #201c29;
    background: #161616;
    white-space: pre;
    -webkit-overflow-scrolling: touch;
    display: block;
    max-width: 100%;
    min-width: 100px;
    font-size: 16px;
    padding: 15px 20px 12px 22px;
    line-height: 1.75;
}

.richtext >>> p b code {
    color: #e0e0e06b;
    padding-bottom: 0;
    padding-top: 0;
    overflow: hidden;
    position: absolute;
}

.richtext >>> h1 h2 h3 h4 h5 h6 {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
}
</style>