<template>
  <v-container>
    <v-row>
      <v-col cols="4" md="4" v-for="(item, index) in items" :key="index">
        <stats-card :item="item" />
      </v-col>
      <v-col cols="4" md="4"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import StatsCard from "@/components/Cards/StatsCard";
import axios from "axios";

export default Vue.extend({
  name: "Dashboard",
  components: {
    StatsCard,
  },
  data: () => ({
    tab: null,
    items: [
      { title: "Events", icon: "mdi-calendar-multiple", number: 0 },
      { title: "Speakers", icon: "mdi-account-multiple", number: 0 },
      { title: "Participants", icon: "mdi-account-group-outline", number: 0 },
    ],
  }),
  created() {
    this.getStats();
  },
  methods: {
    async getStats() {
      const response = await axios.get("http://localhost:3000/stats");
      this.items[0].number = response.data.data.events;
      this.items[1].number = response.data.data.speakers;
      this.items[2].number = response.data.data.participants;
    },
  },
});
</script>

<style scoped>
.v-sheet.v-card {
  border-radius: 20px !important;
}

.v-application a {
  /* color: #fff !important; */
}

.v-list .v-list-item {
  box-shadow: 0px !important;
  border-radius: 20px !important;
  margin: 10px !important;
}

.v-tab {
  text-transform: capitalize !important;
}
</style>
