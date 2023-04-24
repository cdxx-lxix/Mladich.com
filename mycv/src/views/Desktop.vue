<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!-- APPBAR -->
    <v-app-bar :elevation="3">
        <template v-slot:prepend>
            <v-app-bar-nav-icon icon="mdi-application-braces" @click="toggleDrawer"></v-app-bar-nav-icon>
            <v-app-bar-title>{{ $t('appbar.title') }}</v-app-bar-title>
        </template>

        <template v-slot:append>
            <v-btn-group divided>
                <theme />
                <language />
            </v-btn-group>
        </template>
    </v-app-bar>

    <!-- NAVIGATION -->
    <v-navigation-drawer v-model="drawer" location="top" temporary style="height: 57px;">
        <v-layout class="overflow-visible" style="height: 56px;">
            <v-bottom-navigation active>

                <v-btn>{{ $t('menu.home') }}</v-btn>

                <v-divider vertical />

                <v-btn>{{ $t('menu.aboutme') }}</v-btn>

                <v-btn>{{ $t('menu.projects') }}</v-btn>

                <v-btn>{{ $t('menu.youtube') }}</v-btn>

                <v-btn>{{ $t('menu.guides') }}</v-btn>

                <v-btn>{{ $t('menu.contacts') }}</v-btn>

            </v-bottom-navigation>
        </v-layout>
    </v-navigation-drawer>

    <!-- BODY -->
    <v-main>
        <router-view />
    </v-main>
</template>

<script>
    import Language from '@/components/Language.vue';
    import Theme from '@/components/Theme.vue';
    import { ref } from 'vue';
    export default {
        setup() {
            const drawer = ref(false);

            const toggleDrawer = () => {
                drawer.value = !drawer.value;
            };

            return { drawer, toggleDrawer }
        },
        components: {
            Theme,
            Language
        }
    }
</script>