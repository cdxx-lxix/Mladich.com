<template>
    <div class="text-center">
        <div class="text-h3">{{ $t('errors.redirect') }}</div>
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
</template>
  
<script>
export default {
    created() {
        window.location.href = 'https://www.youtube.com'
    },
}
</script>

<style scoped>
.text-center {
    margin-top: 25%;
}

.text-h3 {
    margin-bottom: 10px;
}
</style>