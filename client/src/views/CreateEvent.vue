<template>
  <v-container>
    <v-toolbar flat>
      <!-- <v-toolbar-title>Create New Event</v-toolbar-title> -->
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- <v-card class="mx-auto pa-5" elevation=""> -->
    <v-form>
      <v-row>
        <v-col cols="12" md="12">
          <v-select
            v-model="event.event_type"
            :items="types"
            label="Event Type"
            dense
            outlined
            prepend-icon="mdi-calendar-plus"
          ></v-select>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            label="Event Title"
            outlined
            prepend-icon="mdi-text"
            v-model="event.event_name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea
            outlined
            label="Event Description"
            prepend-icon="mdi-text"
            v-model="event.description"
          ></v-textarea>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="2" md="2">
          <v-img
            :src="speaker.photo"
            style="border-radius: 50%; width: 60px; height: 60px"
          ></v-img>
        </v-col>
        <v-col cols="4" md="4">
          <v-text-field
            label="Speaker Name"
            outlined
            v-model="speaker.name"
          ></v-text-field>
        </v-col>
        <v-col cols="4" md="4">
          <v-text-field
            label="Speaker Designation"
            outlined
            v-model="speaker.designation"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-icon
            color="error"
            size="48"
            style="cursor: pointer"
            @click="deleteSpeaker(index)"
            >mdi-delete</v-icon
          >
        </v-col>
      </v-row> -->
      <v-row>
        <v-col cols="12" md="12" v-show="showSelectSpeaker">
          <v-select
            v-model="event.speaker_id"
            :items="speakers"
            label="Add Speaker"
            persistent-hint
            outlined
            prepend-icon="mdi-account"
            item-text="speaker_name"
            item-value="speaker_id"
          ></v-select>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col>
          <v-btn
            color="event"
            class="mb-3"
            @click="showSpeakerDropdown"
            v-show="!showSelectSpeaker"
            ><v-icon>mdi-plus-circle</v-icon>Add New Speaker</v-btn
          >
        </v-col>
      </v-row> -->
      <v-row>
        <v-col cols="6" md="6">
          <v-dialog
            ref="dialog1"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Select Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog1.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="6" md="6">
          <v-dialog
            ref="dialog2"
            v-model="modal2"
            :return-value.sync="time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                label="Select Time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-time-picker v-if="modal2" v-model="time" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal2 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog2.save(time)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="event.meeting_link"
            outlined
            label="Meeting Link"
            prepend-icon="mdi-text"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="event" class="d-block ml-auto" @click="createEvent"
        >Create Event</v-btn
      >
    </v-form>

    <v-row justify="center">
      <v-dialog v-model="confirmationDialog" max-width="290" persistent>
        <v-card>
          <v-card-title class="headline"> Confirmation </v-card-title>
          <v-card-text align="left">Create a zoom meeting link? </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="cancelConfirmation">
              Cancel
            </v-btn>
            <v-btn color="event darken-1" text @click="includeZoom()">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="eventDialog" max-width="390" persistent>
        <v-card>
          <v-card-title class="headline"> Share the event </v-card-title>
          <v-card-text align="left">
            Share the event by copying following link
            <v-text-field
              v-model="link"
              outlined
              dense
              class="mt-2"
              append-icon="mdi-clipboard"
              @click:append="copyToClipboard"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="event"
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  @click="shareEventModal = true"
                  ><v-icon>mdi-account-multiple</v-icon> Share with Participants
                  <v-icon>mdi-share</v-icon></v-btn
                >
              </template>
              <span>Share with Participants</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="eventDialog = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="shareEventModal" max-width="700" persistent>
        <v-card>
          <v-card-title class="headline"> Share the event </v-card-title>
          <v-card-text align="left">
            <ShareEvent />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="shareEventModal = false">
              Cancel
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
import axios from "axios";
import copy from "copy-to-clipboard";
import ShareEvent from "@/components/Events/ShareEvent";

export default Vue.extend({
  name: "CreateEvent",
  components: {
    ShareEvent,
  },
  data: (vm) => ({
    type: null,
    title: null,
    description: null,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    time: null,
    speakerText: null,
    selected: null,
    selectedSpeakers: [],
    types: ["Webinar", "Conference", "Seminar", "Workshop", "Masterclass"],
    modal: false,
    modal2: false,
    checkbox: false,
    shortSpeaker: [],
    shortUser: [],
    userId: null,
    previewDialog: false,
    confirmationDialog: false,
    zoom: false,
    zoomData: [],
    eventDialog: false,
    link: null,
    shareEventModal: false,
    eventSharingParticipants: [],
    showSelectSpeaker: true,
    event: {
      event_name: null,
      event_type: null,
      event_date: null,
      event_time: null,
      speaker_id: null,
      meeting_link: null,
      description: null,
    },
    speakers: [],
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  created() {
    this.getSpeakers();
  },
  methods: {
    async getSpeakers() {
      try {
        const response = await axios.get("http://localhost:3000/speakers");
        this.speakers = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    displaySpeaker() {
      if (this.speakerText !== null) this.speakerText += this.selected + ",";
      const obj = this.shortSpeaker.find(
        (speaker) => speaker.name === this.selected
      );
      this.selectedSpeakers.push(obj);
      this.selected = "Add New Speaker";
      this.showSelectSpeaker = false;
    },
    async createEvent() {
      this.$store.dispatch("showLoader", { isLoading: true });

      try {
        this.event.event_date = this.dateFormatted;
        this.event.event_time = this.time;

        await axios.post("http://localhost:3000/events", this.event);
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: "Event Created",
          color: "event",
        });
        this.$store.dispatch("showLoader", { isLoading: false });
      } catch (error) {
      this.$store.dispatch("showLoader", { isLoading: false });
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: "Event Creation Failed",
          color: "error",
        });
      }
      //   const location = window.location.href.split("/");
      //   console.log(location);
      //   this.link =
      //     location[0] + "//" + location[2] + "/event/register/" + dataRef.id;
      //   this.eventDialog = true;
      // this.$router.push('/events')
    },
    previewEvent() {
      this.previewDialog = true;
    },
    includeZoom() {
      if (this.checkbox) {
        axios({
          method: "post",
          url: "https://fixb.dev/zoom/create-meeting.php",
          data: {
            topic: this.title,
            startTime: this.date + "T" + this.time + ":00Z",
          },
        }).then((response) => {
          this.zoomData = response.data;
          this.zoom = true;
          this.confirmationDialog = false;
        });
      }
    },
    deleteSpeaker(index) {
      this.selectedSpeakers.splice(index, 1);
    },
    confirmation() {
      this.confirmationDialog = true;
    },
    cancelConfirmation() {
      this.checkbox = false;
      this.confirmationDialog = false;
    },
    copyToClipboard() {
      copy(this.link);
      this.$store.dispatch("showSnackbar", {
        showing: true,
        text: "Copied to clipboard",
        color: "event",
      });
    },
    showSpeakerDropdown() {
      this.showSelectSpeaker = true;
    },
  },
});
</script>

<style>
</style>