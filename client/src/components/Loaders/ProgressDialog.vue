<template>
  <v-container>
    <v-dialog
      v-model="$store.state.progress.dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card color="white">
        <v-card-text>
          Please wait!...
          <v-progress-circular
            :rotate="360"
            :size="100"
            :value="count"
            :width="15"
            color="event"
          >
            {{ count }}
          </v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "ProgressDialog",
  computed: {
    ...mapState({ count: (state) => state.progress.count }),
  },
});
</script>

<style>
</style>