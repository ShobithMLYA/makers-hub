<template>
    <v-container>
        <v-row justify="center">
            <v-dialog v-model="response.isShowing" max-width="700" persistent>
                <v-card>
                    <v-card-title>
                    All Registrations
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="responses"
                    :search="search"
                    ></v-data-table>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="response.isShowing = false">
                        Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import firebase from "firebase";

export default {
    name: "EventResponses",
    computed: {
        ...mapState({ response: (state) => state.event.response }),
    },
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Designation', value: 'designation' },
          { text: 'Organization', value: 'organization' },
          { text: 'Email Address', value: 'email' },
          { text: 'Mobile Number', value: 'mobile' },
        ],
        eventId: null,
        responses: []
      }
    },
    async created(){
      this.eventId = await this.$store.state.event.response.eventId;
      console.log(this.$store.state.event.response.eventId)
      await firebase.firestore().collection("eventRegistrations").where("eventId", "==", ).onSnapshot((snapshot) => {
        snapshot.forEach((document) => {
          console.log(document.data());
        })
      })
    }
  }
</script>