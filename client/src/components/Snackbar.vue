<template>
  <v-snackbar v-model="snackbar.showing" :color="snackbar.color" top>
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="#000" text v-bind="attrs" @click="snackbar.showing = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Snackbar",
  computed: {
    ...mapState({ snackbar: (state) => state.snackbar.snackbar }),
  },
};
</script>

<style scoped>
</style>