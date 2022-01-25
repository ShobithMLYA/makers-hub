<template>
    <v-container>
        <v-img
            :src="data.shortUser.photoURL"
            class="logo mb-5"
            :alt="data.shortUser.displayName"
            width="350px"
            style="margin-left: auto; margin-right: auto;"
            >
        </v-img>
        <v-card class="pa-5">
            <v-card-title>Event Feedback Form</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            outlined
                            prepend-icon="mdi-text"
                            label="Name"
                        >
                        </v-text-field>
                        <v-text-field
                            outlined
                            prepend-icon="mdi-text"
                            label="Where did you here about the event?"
                        >
                        </v-text-field>
                        <p style="font-size: 20px; color: #000;">Topic Rating</p>
                         <v-rating
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            empty-icon="$ratingFull"
                            half-increments
                            hover
                            large
                        >
                        </v-rating>
                        <p style="font-size: 20px; color: #000;">Speaker Rating</p>
                        <v-rating
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            empty-icon="$ratingFull"
                            half-increments
                            hover
                            large
                        >
                        </v-rating>
                        <p style="font-size: 20px; color: #000;">Overall Rating</p>
                        <v-rating
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            empty-icon="$ratingFull"
                            half-increments
                            hover
                            large
                        >
                        </v-rating>
                        <v-textarea label="Any Suggestions?" outlined></v-textarea>
                        <v-btn color="event">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import Vue from "vue";
import firebase from "firebase";

export default Vue.extend({
    name: "Feedback",
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
        }
    }
})
</script>