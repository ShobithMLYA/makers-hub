<template>
    <v-container>
        <!-- <v-img
            :src="data.shortUser.photoURL"
            class="logo mb-5"
            alt="The Startupreneur"
            width="350px"
            style="margin-left: auto; margin-right: auto;"
            >
        </v-img> -->

        <v-card class="pa-5 mr-auto ml-auto" width="800">
            <v-img :src="data.shortUser.photoURL" style="width: 250px; margin-left: auto; margin-right: auto;"></v-img>
            <h1 class="text-center mt-3">{{data.type}}</h1>
            <h2 class="text-center mt-3" style="color: #20D855 !important">{{data.title}}</h2>
            <v-row>
                <v-col cols="4" md="4" class="text-center pa-3" v-for="(speaker, index) in data.speakers" :key="index" style="margin-left: auto; margin-right: auto;">
                    <v-img :src="speaker.photo" style="border-radius: 50%; width: 150px; height: 150px; object-fit: cover;  margin-left: auto; margin-right: auto;"></v-img>
                    <h2 class="mt-3" style="color: #20D855 !important">{{speaker.name}}</h2>
                    <h3 style="color: event;">{{speaker.designation}}</h3>
                    <h3 style="color: event;">{{speaker.organization}}</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12">
                    <h3 class="text-center">{{data.description}}</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12" style="border: 1px solid #20D855; border-radius: 20px;" class="mt-3">
                    <h2 class="text-center">{{data.date}} at {{data.time}} HRS</h2>
                    <div class="d-flex justify-space-around mt-3" v-show="data.zoomData !== undefined || data.zoomData !== null">
                        <h3>Zoom ID: <span style="color: #20D855 !important">{{ data.zoomData[0] }}</span></h3>
                        <h3>Password: <span style="color: #20D855 !important">{{ data.zoomData[1] }}</span></h3>
                        <h3 class="text-center">Meeting Link - <a :href="data.zoomData[2]" style="color: #20D855 !important">Click here</a></h3>
                    </div>
                </v-col>
            </v-row>
            <v-card-actions class="mt-3" >
                <v-spacer></v-spacer>
                 <v-btn
                    color="event"
                    @click="eventRegisterModal = true"
                    style="color: white;"
                >
                    Register Now
                    <v-icon>mdi-login</v-icon>
                </v-btn>
                 <v-btn
                    color="event"
                    @click="copyToClipboard"
                    style="color: white;"
                >
                    Share Event  <v-icon>mdi-share</v-icon>
                </v-btn>
                <v-btn
                    color="event"
                    style="color: white;"
                >
                    Download Poster  <v-icon>mdi-download</v-icon>
                </v-btn>
                <v-btn
                    color="event"
                    style="color: white;"
                >
                    Add to Calendar  <v-icon>mdi-calendar</v-icon>
                </v-btn>
                <v-spacer></v-spacer>

            </v-card-actions>
        </v-card>
        <v-row justify="center">
            <v-dialog v-model="eventRegisterModal" max-width="700" persistent>
                <v-card>
                    <v-card-title class="headline text-center"> Event Registration </v-card-title>
                    <v-card-text>
                        <v-form ref="">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        outlined
                                        label="Name"
                                        prepend-icon="mdi-text"
                                        v-model="participant.name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        outlined
                                        label="Designation/ Occupation"
                                        prepend-icon="mdi-school"
                                        v-model="participant.designation"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        outlined
                                        label="Organization/ Company"
                                        prepend-icon="mdi-bank"
                                        v-model="participant.organization"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        outlined
                                        label="Email Address"
                                        prepend-icon="mdi-email"
                                        v-model="participant.email"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        outlined
                                        label="Mobile Number"
                                        prepend-icon="mdi-phone"
                                        v-model="participant.mobile"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="event darken-1" @click="eventRegisterModal = false">
                        Close
                        </v-btn>
                        <v-btn color="event darken-1" @click="register">
                        Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import Vue from "vue";
import firebase from "firebase";
import copy from 'copy-to-clipboard';

export default Vue.extend({
    name: "Register",
    data: () => ({
        data: {},
        eventRegisterModal: false,
        participant: {
            name: null,
            designation: null,
            organization: null,
            email: null,
            mobile: null,
            community: null,
            totalEvents: 0,
            shortUser: null,
            userId: null,
            shortEvent: null,
            eventId: null   
      },
      eventId: null
    }),
    async created(){
        const location = window.location.href
        const reqId = location.split("/")[5]
        this.eventId = reqId
        const doc = await firebase.firestore().collection('events').doc(reqId).get();
        this.data = doc.data();
    },
    methods: {
        register(){
            this.participant.shortEvent = this.data
            this.participant.eventId = this.eventId
            this.participant.shortUser = this.data.shortUser
            this.participant.userId = this.data.userId

            firebase.firestore().collection('eventRegistrations').add(this.participant)
            this.$store.dispatch("showSnackbar", {
                showing: true,
                text: "Registration eventfull",
                color: "event",
            });
            this.eventRegisterModal = false
        },
        copyToClipboard(){
            const location = window.location.href.split("/");
            const link = location[0] + "//" + location[2] + "/event/register/" + location[5]
            copy(link);
            this.$store.dispatch("showSnackbar", {
                showing: true,
                text: "Copied to clipboard",
                color: "event",
            });
        },
    }
})
</script>