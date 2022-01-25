<template>
    <v-container>
        <v-toolbar
            flat
        >
        <!-- <v-toolbar-title>Request Speaker</v-toolbar-title> -->
        </v-toolbar>
        <!-- <v-card class="mx-auto pa-5" elevation=""> -->
            <v-form>
                <v-row>
                    <v-col
                        cols="12"
                        md="12"
                    >
                        <v-select
                            v-model="selectedSpeaker"
                            :items="speakers"
                            label="Select Speaker"
                            persistent-hint
                            outlined
                            prepend-icon="mdi-account"
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        md="12"
                    >
                        <v-textarea
                            outlined
                            label="Any Comments?"
                            prepend-icon="mdi-text"
                            v-model="description"
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-btn color="event" @click="request"> Request Availibility</v-btn>
            </v-form>
        <!-- </v-card> -->
    </v-container>
</template>

<script>
import Vue from "vue";
import { speakers, shortSpeaker } from "@/services/short_speaker";
import { shortUser, userId } from "../services/short_user";
import firebase from "firebase";

export default Vue.extend({
    name: "RequestSpeaker",
    data () {
      return {
        speakers: [],
        selectedSpeaker: null,
        description: null,
        shortSpeakers: [],
        shortUser: [],
        userId: null
      }
    },
    created(){
        this.speakers = speakers,
        this.shortSpeakers = shortSpeaker
        this.shortUser = shortUser[0];
        this.userId = userId;
    },
    methods: {
        request(){
            this.$store.dispatch("showLoader", { isLoading: true });

            const obj = this.shortSpeakers.find(
                (speaker) => speaker.name === this.selectedSpeaker
            );
            const data = {
                date: "Not Updated",
                time: "Not Updated",
                status: "active",
                name: obj.name,
                email: obj.email,
                mobile: obj.mobile,
                photo: obj.photo,
                description: this.description,
                shortUser: this.shortUser,
                userId: this.userId
            }

             setTimeout(() => {
                firebase.firestore().collection('speakerAvailability').add(data)
            }, 3000)

            this.$store.dispatch("showSnackbar", {
                showing: true,
                text: "Request Sent",
                color: "event",
            });
            this.$store.dispatch("showLoader", { isLoading: false });
            this.selectedSpeaker = null;
            this.description = null;
            // this.$router.push('/availability')
        }
    }
});
</script>

<style>
</style>