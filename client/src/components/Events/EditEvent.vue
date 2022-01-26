<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Event</span>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="show = false" color="red">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
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
          <v-row>
            <v-col cols="12" md="12">
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
                    v-model="date"
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
          <v-btn color="event" class="d-block ml-auto" @click="updateEvent"
            >Update Event</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: ["visible", "event"],
  data() {
    return {
      speakers: [],
      types: ["Webinar", "Conference", "Seminar", "Workshop", "Masterclass"],
      modal: false,
      modal2: false,
    };
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) this.$emit("close");
      },
    },
    date: {
      get() {
        return this.event.event_date;
      },
      set(value) {
        this.event.event_date = value;
      },
    },
    time: {
      get() {
        return this.event.event_time;
      },
      set(value) {
        this.event.event_time = value;
      },
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
    async updateEvent() {
      this.$store.dispatch("showLoader", { isLoading: true });
      const data = {
        event_type: this.event.event_type,
        event_name: this.event.event_name,
        description: this.event.description,
        speaker_id: this.event.speaker_id,
        meeting_link: this.event.meeting_link,
        event_date: this.event.event_date,
        event_time: this.event.event_time,
      };
      try {
        await axios.put(
          `http://localhost:3000/events/${this.event.event_id}`,
          data
        );
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: "Event Updated",
          color: "event",
        });
        this.$store.dispatch("showLoader", { isLoading: false });
        this.$emit("close");
      } catch (error) {
        this.$store.dispatch("showLoader", { isLoading: false });
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: "Event Updation Failed",
          color: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>