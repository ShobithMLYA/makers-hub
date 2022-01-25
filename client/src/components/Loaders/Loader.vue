<template>
  <v-container>
    <loading
      :active.sync="loader.isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
      color="event"
      loader="bars"
      :width="width"
      :height="height"
      background-color="#ffffff"
      :opacity="opacity"
    ></loading>
  </v-container>
</template>

<script>
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapState } from "vuex";

export default Vue.extend({
  name: "Loader",
  data() {
    return {
      fullPage: true,
      width: 64,
      height: 64,
      opacity: 0.8,
    };
  },
  components: {
    Loading,
  },
  computed: {
    ...mapState({ loader: (state) => state.loader.loader }),
  },
});
</script>

<style>
</style>