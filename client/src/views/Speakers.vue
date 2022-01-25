<template>
  <v-container>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="event"
        fixed-tabs
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-1">
          All Speakers
          <v-icon>mdi-playlist-check</v-icon>
        </v-tab>
        <v-tab href="#tab-2">
          Create Event
          <v-icon>mdi-calendar-plus</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :key="1" value="tab-1">
          <AllSpeakers />
        </v-tab-item>
        <v-tab-item :key="2" value="tab-2">
          <CreateEvent />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
import AllSpeakers from "./AllSpeakers";
import CreateEvent from "./CreateEvent";

export default Vue.extend({
  name: "Speakers",
  components: {
    CreateEvent,
    AllSpeakers,
  },
  data: () => ({
    tab: null,
    speaker: {
      name: null,
      designation: null,
      organization: null,
      email: null,
      mobile: null,
      photo: null,
      shortUser: null,
      userId: null,
    },
  }),
});
</script>
<style>
.v-sheet.v-card {
  border-radius: 20px !important;
}
</style>