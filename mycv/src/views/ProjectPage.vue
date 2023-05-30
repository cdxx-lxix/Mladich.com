<template>
    <v-row>
        <v-col cols="12">
            <v-card class="ma-5">
                <v-img :src="randomPattern" height="200" cover>
                    <div class="my-title text-white">
                        <div class="text-h4">
                            <span class="me-1">{{ project.title }}</span>
                            <v-divider :thickness="2" vertical color="secondary"></v-divider>

                            <div class="text-h6">{{ project.category }} / <v-icon :icon="project.projectIcon"></v-icon>
                            </div>
                        </div>
                        <v-btn-group divided width="100%" class="my-12" variant="tonal">
                            <v-btn prepend-icon="mdi-arrow-left" variant="flat" size="small"
                                @click="this.$router.push({ name: 'My projects' })">{{ $t('project.backbtn') }}</v-btn>
                            <v-btn prepend-icon="custom:gitIcon" color="secondary" :href="project.repo" size="small"
                                :disabled="!project.repo ? true : false">{{ $t('project.repobtn') }}</v-btn>
                            <v-btn prepend-icon="mdi-web" color="primary" :href="project.website" class="text-white" size="small"
                                :disabled="!project.website ? true : false">{{ $t('project.sitebtn') }}</v-btn>
                        </v-btn-group>
                    </div>
                </v-img>
                <v-row class="ma-1">
                    <v-col cols="12" lg="6" variant="outlined">
                        <v-sheet border="md" class="text-body-1 pa-4 richtext" v-html="richText"></v-sheet>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-sheet border="md" class="pa-4">
                            <v-carousel progress="primary" hide-delimiters mandatory touch height="auto"
                                v-if="project && project.gallery && project.gallery.length > 0">
                                <v-carousel-item v-for="image in project.gallery" :key="image.fields.title"
                                    :aspect-ratio="16 / 9">
                                    <v-img class="d-flex fill-height justify-center align-center"
                                        :src="image.fields.file.url" :alt="image.fields.title" contain></v-img>
                                </v-carousel-item>
                            </v-carousel>
                            <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
                        </v-sheet>
                        <v-spacer></v-spacer>
                        <v-sheet border="md" class="pa-4 mt-6">
                            <div class="text-h6">{{ $t('project.tech') }}</div>
                            <v-divider :thickness="2"></v-divider>
                            <v-chip-group style="pointer-events: none;">
                                <v-chip v-for="item in project.techIcons" :key="item" :prepend-icon="item.icon"
                                    variant="outlined" color="secondary">
                                    {{ item.name }}
                                </v-chip>
                            </v-chip-group>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-card>
            <v-card v-if="isLoading">
                <div class="text-center">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { fetchOne } from '@/plugins/apiFunctions'
export default {
    props: {
        slug: String
    },
    data() {
        return {
            randomPattern: ''
        }
    },
    async beforeMount() {
        // All of these pictures are from https://www.freepik.com/ 
        // Randomly assigns a header picture
        let patterns = [
            () => import('@/assets/patterns/1_shape.svg'),
            () => import('@/assets/patterns/2_shape.svg'),
            () => import('@/assets/patterns/3_shape.svg'),
            () => import('@/assets/patterns/4_shape.svg'),
            () => import('@/assets/patterns/5_shape.svg'),
            () => import('@/assets/patterns/6_shape.svg'),
            () => import('@/assets/patterns/7_shape.svg')
        ]
        let randomPatternIndex = Math.floor(Math.random() * patterns.length)
        let patternModule = await patterns[randomPatternIndex]()
        this.randomPattern = patternModule.default
    },
    setup(props) {
        const project = ref({})
        const richText = ref('')
        const isLoading = computed(() => project.value.length === 0 ? true : false)

        onMounted(async () => {
            try {
                const fetched = await fetchOne('project', props.slug)
                project.value = fetched.contentBody
                richText.value = fetched.convertedText
            } catch (error) {
                console.log(error)
            }
        })
        const { t } = useI18n()
        watch(project, () => {
            useHead({
                title: t('meta.thisproject_title') + project.value.title,
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
        return { project, richText, isLoading }
    }
}
</script>

<style scoped>
@import url(@/css/richtext.css);

.my-title {
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(18, 18, 18, 0.8) 25%, rgba(255, 255, 255, 0) 100%);
    height: 100%;
    padding: 15px;
}
</style>