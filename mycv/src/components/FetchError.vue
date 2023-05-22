<template>
    <v-col cols="12">
        <v-row class="ma-2">
            <v-col cols-12>
                <div>
                    {{ $t('errors.fetchError') }}
                </div>
                <div>
                    {{ $t('errors.fetchErrorNotice') }}
                </div>
                <v-progress-linear class="pa-1 mt-2" color="secondary" indeterminate></v-progress-linear>
            </v-col>
        </v-row>
    </v-col>
</template>