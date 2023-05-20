<template>
    <v-row>
        <v-col cols="12">
            <v-card class="ma-5">
                <v-img :src="randomPattern" height="200" cover></v-img>
                <v-row>
                    <v-col cols="12">
                        <v-list-item class="mt-2">
                            <template v-slot:prepend>
                                <div class="text-h4">
                                    <span class="me-1">{{ project.title }} - </span>
                                    <v-divider :thickness="2" vertical color="secondary"></v-divider>
                                    <v-icon :icon="project.projectIcon"></v-icon>
                                    <div class="text-caption">{{ project.category }}</div>
                                </div>
                            </template>
                            <template v-slot:append>
                                <v-btn variant="tonal" @click="this.$router.push({ name: 'My projects' })">Back</v-btn>
                                <v-list-item></v-list-item>
                                <v-btn variant="tonal" color="secondary" :href="project.repo"
                                    :disabled="!project.repo ? true : false">Visit repo</v-btn>
                                <v-list-item></v-list-item>
                                <v-btn variant="tonal" color="primary" :href="project.website"
                                    :disabled="!project.website ? true : false">Visit website</v-btn>
                            </template>
                        </v-list-item>
                    </v-col>
                </v-row>
                <v-row class="ma-1">
                    <v-col :cols="columns" variant="outlined">
                        <v-sheet border="md" class="text-body-1 pa-4" v-html="richText"></v-sheet>
                    </v-col>
                    <v-col :cols="columns">
                        <v-sheet border="md" class="pa-4">
                            <v-carousel progress="primary" hide-delimiters mandatory touch height="auto" v-if="project && project.gallery && project.gallery.length > 0">
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
        </v-col>
    </v-row>
</template>

<script>
import client from '@/plugins/contentful'
import { ref, onMounted, computed } from 'vue'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useRouter } from 'vue-router'
import { useWindowSize } from 'vue-window-size'
export default {
    props: ['slug'],
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
        const router = useRouter()
        const columns = computed(() => columnCalculator())
        let windowWidth = useWindowSize().width // Composition API version of $windowWidth

        const fetchProject = async (slug) => {
            try {
                const response = await client.getEntries({
                    content_type: 'project',
                    'fields.slug': slug,
                })

                if (response.items.length > 0) {
                    project.value = response.items[0].fields
                    richText.value = documentToHtmlString(project.value.fullText)

                } else {
                    throw new Error('Project not found')
                }
            } catch (error) {
                console.error('Error fetching project:', error)
                router.push({ name: '404', params: { catchAll: 'not-found' } })
            }
        }

        function columnCalculator() {
            switch (true) {
                case windowWidth.value >= 1280:
                    return 6
                default:
                    return 12
            }
        }
        onMounted(() => {
            fetchProject(props.slug)
        })

        return { project, richText, columns }
    }
}
</script>

<style>
ol {
    padding: 20px;
}
blockquote {
    margin-top: 10px;
    margin-bottom: 10px;
    border-left: 5px solid;
    padding-left: 8px;
}
</style>