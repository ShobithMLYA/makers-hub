<template>
  <v-container>
    <v-row>
      <v-col cols="4" md="4" v-for="(item, index) in items" :key="index">
        <StatsCard :item="item"/>
      </v-col>
      <v-col cols="4" md="4">
        
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="8" md="8">
        <v-card class="mx-auto pa-2 graph__block" elevation="15">
          <v-tabs
              v-model="tab"
              background-color="event"
              fixed-tabs
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-1">
                Feedback Analytics
                <v-icon>mdi-graph</v-icon>
              </v-tab>
              <v-tab href="#tab-2">
                Response Analytics
                <v-icon>mdi-account-multiple</v-icon>
              </v-tab>
          </v-tabs>
        
          <v-tabs-items v-model="tab">
            <v-tab-item
              :key="1"
              value="tab-1"
            >
             <h3 class="text-center pa-3">Feedback Analytics will appear here</h3> -->

              <!-- <ejs-chart
                id="container"
                :title="title"
                :primaryXAxis="primaryXAxis"
                :primaryYAxis="primaryYAxis"
                :tooltip="tooltip"
                width="680px"
              >
                <e-series-collection>
                  <e-series
                    :dataSource="seriesData"
                    type="Line"
                    xName="name"
                    yName="feedback"
                    name="Feedbacks"
                    :marker="marker"
                  >
                  </e-series>
                </e-series-collection>
              </ejs-chart> -->
            <!-- </v-tab-item>
            <v-tab-item
              :key="2"
              value="tab-2"
            >
            <h3 class="text-center pa-3">Response Analytics will appear here</h3> -->
             <!-- <ejs-chart
                id="container"
                :title="title"
                :primaryXAxis="primaryXAxis"
                :primaryYAxis="primaryYAxis"
                :tooltip="tooltip"
                width="680px"
              >
                <e-series-collection>
                  <e-series
                    :dataSource="seriesData"
                    type="Line"
                    xName="name"
                    yName="feedback"
                    name="Feedbacks"
                    :marker="marker"
                  >
                  </e-series>
                </e-series-collection>
              </ejs-chart> -->
            <!-- </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col cols="4" md="4">
        <v-card class="mx-auto pa-2" max-width="500">
          <v-toolbar color="event" dark>
            <v-toolbar-title>Upcoming Events</v-toolbar-title>
          </v-toolbar>
          
          <h3 class="text-center pa-3" v-if="upcomingEvents.length === 0">Upcoming Events will appear here</h3>
          <v-list two-line>
            <v-list-item-group
              v-model="selected"
              active-class="pink--text"
              multiple
            >
              <template v-for="(item, index) in upcomingEvents">
                <v-list-item
                  :key="index"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.speakers[0].photo"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <a :href="`https://events.thestartupreneur.co/event/register/${item.docId}`" target="_blank">
                      <v-list-item-title v-html="item.title"></v-list-item-title>
                    </a>
                    <v-list-item-subtitle v-html="item.description"
                    class="mt-2"
                    ></v-list-item-subtitle>
                    <v-list-item-action-text
                    class="mt-2 black--text"
                    color="black"
                    ><v-spacer></v-spacer><v-icon size="14">mdi-calendar</v-icon> {{item.date}} <v-icon size="14">mdi-clock</v-icon> {{item.time}}</v-list-item-action-text>
                  </v-list-item-content>

                   <v-list-item-action>
                    <v-list-item-action-text
                    ><v-icon size="14">mdi-clock</v-icon>{{item.date}}</v-list-item-action-text>
                    <v-list-item-action-text
                    ><v-icon size="14">mdi-clock</v-icon>{{item.date}}</v-list-item-action-text>
                  </v-list-item-action> -->
                <!-- </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row> --> 
  </v-container>
</template>

<script>
import Vue from "vue";
// import { shortSpeaker } from "@/services/short_speaker";
import { userId } from "../services/short_user";
import firebase from "firebase";
import StatsCard from "@/components/Cards/StatsCard"

import {
  ChartPlugin,
  LineSeries,
  Category,
  DataLabel,
  Tooltip,
} from "@syncfusion/ej2-vue-charts";

Vue.use(ChartPlugin);

export default Vue.extend({
  name: "Dashboard",
  components: {
    StatsCard
  },
  data: () => ({
    tab: null,
    selected: [2],
    items: [
      { title: "Events", icon: "mdi-calendar-multiple", number: 0},
      { title: "Speakers", icon: "mdi-account-multiple", number: 0},
      { title: "Participants", icon: "mdi-account-group-outline", number: 0}
    ],
    seriesData: [
      { name: "Name1", feedback: 4.5 },
      { name: "Name2", feedback: 5 },
      { name: "Name3", feedback: 3.5 },
      { name: "Name4", feedback: 2.5 },
      { name: "Name5", feedback: 4 },
      { name: "Name6", feedback: 5 },
      { name: "Name7", feedback: 5 },
      { name: "Name8", feedback: 3 },
      { name: "Name9", feedback: 3.5 },
      { name: "Name10", feedback: 4 },
      { name: "Nam11", feedback: 5 },
      { name: "Name12", feedback: 1 },
    ],
    primaryXAxis: {
      valueType: "Category",
    },
    primaryYAxis: {
      labelFormat: "{value}",
    },
    legendSettings: {
      visible: true,
    },
    marker: {
      dataLabel: {
        visible: true,
      },
    },
    tooltip: { enable: true },
    // title: "Feedback Analysis",
    eventCount: 0,
    speakerCount: 0,
    participantsCount: 0,
    upcomingEvents: []
  }),
  provide: {
    chart: [LineSeries, Category, DataLabel, Tooltip],
  },
  updated () {
    firebase.firestore().collection("events").where("userId", "==", userId).onSnapshot((snapshot) => {
      this.upcomingEvents = []
      this.items[0].number = snapshot.size
      snapshot.forEach((document) => {
        this.upcomingEvents.push(document.data())
      })
    })

    firebase.firestore().collection("speakers").where("userId", "==", userId).onSnapshot((snapshot) => {
      this.items[1].number = snapshot.size
    })

    firebase.firestore().collection("participants").where("userId", "==", userId).onSnapshot((snapshot) => {
      this.items[2].number = snapshot.size
    })
  },
});
</script>

<style scoped>
.v-sheet.v-card{
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

.v-tab{
  text-transform: capitalize !important;
}
</style>
