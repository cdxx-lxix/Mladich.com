<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row class="d-flex justify-space-evenly my-background">
    <v-sheet class="flex-grow-1 flex-shrink-0 h-screen custom-col transparent-sheet" color="grey-lighten-3" height="424">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5" align="center" justify="center">
          <div class="no-selection">About Me</div>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="flex-grow-1 flex-shrink-0 h-screen custom-col transparent-sheet" color="grey-lighten-3" height="424">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5" align="center" justify="center">
          <div class="no-selection">My Projects</div>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="flex-grow-1 flex-shrink-0 h-screen custom-col transparent-sheet" color="grey-lighten-3" height="424">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5" align="center" justify="center">
          <div class="no-selection">My Channel</div>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="flex-grow-1 flex-shrink-0 h-screen custom-col transparent-sheet" color="grey-lighten-3" height="424">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5" align="center" justify="center">
          <div class="no-selection">Guides</div>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="flex-grow-1 flex-shrink-0 h-screen custom-col transparent-sheet" color="grey-lighten-3" height="424">
      <v-container fluid class="fill-height">
        <v-row class="fill-height text-h5" align="center" justify="center">
          <div class="no-selection">Contacts</div>
        </v-row>
      </v-container>
    </v-sheet>
  </v-row>
</template>

<script setup>

</script>

<style scoped>
.custom-col {
  flex: 1 0 20%;
  max-width: 20%;
}
.transparent-sheet {
    background-color: rgba(255, 255, 255, 0.4) !important;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  .transparent-sheet:hover {
    background-color: rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
.my-background {
  background-color: blue;
}
.no-selection {
  user-select: none;
}
</style>
