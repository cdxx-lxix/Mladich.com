<template>
    <v-row>
        <v-col cols="12">
            <v-card class="ma-5">
                <v-img :src="randomPattern" height="200" cover></v-img>
                <v-card-action>
                    <v-list-item class="mt-2">
                        <template v-slot:prepend>
                            <div class="text-h4">
                                <span class="me-1">{{ project.title }}</span>
                                <v-divider :thickness="2" vertical color="secondary"></v-divider>
                                <v-icon :icon="project.projectIcon"></v-icon>
                            </div>
                        </template>
                        <template v-slot:append>
                            <v-btn variant="tonal" color="secondary" :href="project.repo" :disabled="!project.repo ? true : false">Visit repo</v-btn>
                            <v-list-item></v-list-item>
                            <v-btn variant="tonal" color="primary" :href="project.website" :disabled="!project.website ? true : false">Visit website</v-btn>
                        </template>
                    </v-list-item>
                </v-card-action>
                <v-row class="ma-1">
                    <v-col cols="6" variant="outlined">
                        <v-sheet border="md" class="text-body-1 pa-4" v-html="richText"></v-sheet>
                    </v-col>
                    <v-col cols="6">
                        <v-sheet border="md" class="pa-4">
                            <v-carousel>
                                <v-carousel-item v-for="image in project.gallery" :key="image.fields.title" :src="image.fields.file.url" cover></v-carousel-item>
                            </v-carousel>
                        </v-sheet>
                        <v-spacer></v-spacer>
                        <v-sheet border="md" class="pa-4 mt-6">
                            <div class="text-h6">Tech</div>
                            <v-divider :thickness="2"></v-divider>
                            <v-chip-group style="pointer-events: none;">
                                <v-chip v-for="item in project.techIcons" :key="item" :prepend-icon="item.icon" variant="outlined" color="secondary">
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
import { ref, onMounted } from 'vue'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
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
            }
        }
        onMounted(() => {
            fetchProject(props.slug)
        })

        return { project, richText }
    }
}
</script>