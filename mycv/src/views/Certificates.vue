<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-row class="ma-2">
                <v-col cols="12" sm="6" md="4" lg="3" xl="2" xxl="1" v-for="cert in certificates" :key="cert"
                    class="d-flex flex-director">
                    <v-card class="flex-grow-1" append-icon="mdi-open-in-new" :title="cert.fields.course"
                        :href="cert.fields.link">
                        <v-img :src="cert.fields.logo.fields.file.url" cover class="ma-2"></v-img>
                        <v-divider class="ma-2"></v-divider>
                        <span>
                            <v-card-subtitle>
                                <span>{{ $t('certificates.acquired') }}</span> <span>{{ cert.fields.acquired }}</span>
                            </v-card-subtitle>
                            <v-card-subtitle>
                                <span>{{ $t('certificates.type') }}</span> <span>{{ cert.fields.type }}</span>
                            </v-card-subtitle>
                            <v-chip-group class="mx-4 mb-2" style="pointer-events: none;">
                                <v-chip v-for="item in cert.fields.skills" :key="item" :prepend-icon="item.icon"
                                    variant="flat" color="primary">
                                    {{ item.title }}
                                </v-chip>
                            </v-chip-group>
                        </span>


                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <FetchError v-if="loading"></FetchError>
    </v-row>
</template>

<script>
import { ref, onMounted, watch } from "vue"
import { fetchContent } from '@/plugins/apiFunctions'
import FetchError from '@/components/FetchError.vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
export default {
    setup() {
        const loading = ref(false) // True when there is an error in fetching data from api. Also needed for future infinite scroll option
        const certificates = ref([]) // Array of projects from the API
        const { t, locale } = useI18n()

        // Contentful API request 
        const fetcher = async () => {
            try {
                certificates.value = await fetchContent('certificates', 'fields.course,fields.acquired,fields.logo,fields.link,fields.skills,fields.type')
            } catch (error) {
                loading.value = true
            }
        }
        watch(locale, fetcher, { immediate: true })
        onMounted(fetcher)

        useHead({
            title: t('menu.certificates'),
            meta: [
                {
                    name: 'description',
                    content: t('meta.certs_desc'),
                },
                {
                    name: 'lang',
                    content: localStorage.getItem('lang')
                }
            ],
        })
        return { loading, certificates }
    },
    components: {
        FetchError
    }
}
</script>