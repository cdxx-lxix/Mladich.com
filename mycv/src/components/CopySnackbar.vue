<template>
    <v-snackbar v-model="snackbar" timeout="2000" :color="color">
        {{ message }}
        <template v-slot:actions>
            <v-btn color="black" variant="text" @click="snackbar = false">Close</v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
    };
  },
  props: {
    message: String,
    color: String
  }
}
</script>