<template>
    <v-container>
         <v-img
            :src="data.shortUser.photoURL"
            class="logo mb-5"
            alt="The Startupreneur"
            width="350px"
            style="margin-left: auto; margin-right: auto;"
            ></v-img>
            <v-card style="padding: 10px;">
                <v-card-text>
                    <p class="display-1 text--primary" style="text-align: center;">Update Availability</p>
                    <v-form ref="updateForm">
                    <v-row>
                        <v-col md6 sm12 lg6>
                        <h3 class="text--primary">Select the Date: </h3>
                        </v-col>
                        <v-col md6 sm12 lg6>
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="Select date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="rules.dateRules"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md6 sm12 lg6>
                        <h3 class="text--primary">Select the Time: </h3>
                        </v-col>
                        <v-col md6 sm12 lg6>
                        <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="time" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="time" label="Select time" prepend-icon="mdi-clock" readonly v-bind="attrs" v-on="on" :rules="rules.timeRules"></v-text-field>
                            </template>
                            <v-time-picker v-if="modal2" v-model="time" full-width>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog2.save(time)">OK</v-btn>
                            </v-time-picker>
                        </v-dialog>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md6 sm12 lg6>
                        <v-textarea clearable label="Additional information to share?" v-model="info" outlined prepend-icon="mdi-text"></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-spacer> </v-spacer>
                        <v-btn color="event" @click="update">Update</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import Vue from "vue";
import firebase from "firebase";

export default Vue.extend({
    name: "UpdateSpeakerAvailability",
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        time: null,
        modal2: false,
        info: null,
        data: {},
        reqId: null,
        rules: {
                dateRules: [
                    v => !!v || 'Date is required',
                ],
                timeRules: [
                    v => !!v || 'Time is required',
                ]
            },
    }),
    async created(){
        console.log("hello")
        const location = window.location.href
        const reqId = location.split("/")[5]
        this.reqId = reqId
        const doc = await firebase.firestore().collection('speakerAvailability').doc(reqId).get();
        const data = doc.data();
        this.data = data;
    },
    methods: {
        async update(){
            if(this.$refs.updateForm.validate()){
                const data = {
                    date: this.date,
                    time: this.time,
                    info: this.info
                }

                await firebase.firestore().collection('speakerAvailability').doc(this.reqId).set(data, {merge: true})
                this.$store.dispatch("showSnackbar", {
                    showing: true,
                    text: "Updated",
                    color: "event",
                });
            }
        }
    }
})
</script>