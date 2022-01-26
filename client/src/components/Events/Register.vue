<template>
  <v-container>
    <v-card class="pa-5 mr-auto ml-auto" width="800">
      <!-- <v-img
        :src="require(`../../uploads/${data.speaker_photo}`)"
        style="width: 250px; margin-left: auto; margin-right: auto"
      ></v-img> -->
      <h1 class="text-center mt-3">{{ data.event_type }}</h1>
      <h2 class="text-center mt-3" style="color: #20d855 !important">
        {{ data.event_name }}
      </h2>
      <v-row>
        <v-col
          cols="4"
          md="4"
          class="text-center pa-3"
          style="margin-left: auto; margin-right: auto"
        >
          <v-img
            :src="require(`../../uploads/speakers/${data.speaker_photo}`)"
            style="
              border-radius: 50%;
              width: 150px;
              height: 150px;
              object-fit: cover;
              margin-left: auto;
              margin-right: auto;
            "
          ></v-img>
          <h2 class="mt-3" style="color: #20d855 !important">
            {{ data.speaker_name }}
          </h2>
          <h3 style="color: event">{{ data.speaker_desg }}</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <h3 class="text-center">{{ data.description }}</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="12"
          style="border: 1px solid #20d855; border-radius: 20px"
          class="mt-3"
        >
          <h2 class="text-center">
            {{ data.event_date }} at {{ data.event_time }} HRS
          </h2>
          <div class="d-flex justify-space-around mt-3">
            <h3 class="text-center">
              Meeting Link -
              <a
                :href="data.meeting_link"
                style="color: #20d855 !important"
                target="_blank"
              >
                Click here</a
              >
            </h3>
          </div>
        </v-col>
      </v-row>
      <v-card-actions class="mt-3">
        <v-spacer></v-spacer>
        <v-btn
          color="event"
          @click="eventRegisterModal = true"
          style="color: white"
        >
          Register Now
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn color="event" @click="copyToClipboard" style="color: white">
          Share Event <v-icon>mdi-share</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="eventRegisterModal" max-width="700" persistent>
        <v-card>
          <v-card-title class="headline text-center">
            Event Registration
          </v-card-title>
          <v-card-text>
            <v-form ref="">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    outlined
                    label="Name"
                    prepend-icon="mdi-text"
                    v-model="participant.p_name"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    outlined
                    label="Email Address"
                    prepend-icon="mdi-email"
                    v-model="participant.p_email"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    outlined
                    label="Mobile Number"
                    prepend-icon="mdi-phone"
                    v-model="participant.p_mobile"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    outlined
                    label="LinkedIn"
                    prepend-icon="mdi-bank"
                    v-model="participant.linked_in"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text dark @click="eventRegisterModal = false">
              Close
            </v-btn>
            <v-btn color="event" dark @click="register"> Register </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import copy from "copy-to-clipboard";
import axios from "axios";

export default Vue.extend({
  name: "Register",
  data: () => ({
    data: {},
    eventRegisterModal: false,
    participant: {
      p_name: null,
      linked_in: null,
      p_email: null,
      p_mobile: null,
    },
  }),
  async created() {
    this.getEvent();
  },
  methods: {
    async getEvent() {
      try {
        const response = await axios.get(
          `http://localhost:3000/events/${this.$route.params.id}`
        );
        this.data = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async register() {
      this.participant.event_id = this.data.event_id;
      try {
        await axios.post(
          "http://localhost:3000/participants",
          this.participant
        );
        this.eventRegisterModal = false;
        this.participant = {
          p_name: null,
          linked_in: null,
          p_email: null,
          p_mobile: null,
        };
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: "Registration Successful",
          color: "event",
        });
        this.eventRegisterModal = false;
      } catch (error) {
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: error,
          color: "error",
        });
      }
    },
    copyToClipboard() {
      const location = window.location.href.split("/");
      const link =
        location[0] + "//" + location[2] + "/event/register/" + location[5];
      copy(link);
      this.$store.dispatch("showSnackbar", {
        showing: true,
        text: "Copied to clipboard",
        color: "event",
      });
    },
  },
});
</script>