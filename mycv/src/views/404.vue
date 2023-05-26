<template>
    <v-row no-gutters height="100%">
        <v-col cols="12" align-self="center">
            <div class="text-h2 text-center mt-10">
                {{ $t('errors.404_title') }}
            </div>
            <v-img class="center-img" width="960" cover aspect-ratio="4/3" :src="pic"></v-img>
        </v-col>
    </v-row>
</template>

<script>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import pic from "../assets/images/UrbanSunset.svg"
export default {
    data() {
        return { pic }
    },
    setup() {
        const { t } = useI18n()
        useHead({
            title: t('errors.404_title') + ' | 404',
            meta: [
                {
                    name: 'description',
                    content: t('errors.404_meta'),
                },
            ],
        })
    }
}
</script>

<style scoped>
.center-img {
    margin: auto;
    width: 50%;
}
</style>