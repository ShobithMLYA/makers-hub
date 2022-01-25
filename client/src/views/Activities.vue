<template>
  <v-card class="mx-auto" max-width="98%">
    <v-toolbar color="event" dark>
      <v-toolbar-title>All Activities</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-row>
        <v-col cols="6"></v-col>
        <v-col cols="5">
<v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        show-select
                    ></v-text-field>
        </v-col>

      </v-row>
      <v-list-item-group v-model="selected" active-class="pink--text" multiple>
        <template v-for="(activity, index) in activities">
          <v-list-item :key="index">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="activity.type"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="activity.statement"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text
                  v-text="activity.date.toDate()"
                ></v-list-item-action-text>

                <v-icon v-if="!active" color="grey lighten-1">
                  mdi-star-outline
                </v-icon>

                <v-icon v-else color="yellow darken-3"> mdi-star </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index < activity.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import firebase from "firebase";
import { userId } from "../services/short_user";

export default {
  name: "Activities",
  data: () => ({
    selected: [2],
    activities: [],
  }),
  created(){
    firebase.firestore().collection('activityLog').where("userId", "==", userId).onSnapshot((snapshot) => {
      snapshot.forEach((document) => {
        this.activities.push(document.data())
      })
    })
  }
};
</script>