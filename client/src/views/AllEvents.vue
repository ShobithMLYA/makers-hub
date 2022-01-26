<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="events"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              outlined
              show-select
              dense
            ></v-text-field>
          </v-toolbar-title>
          <!-- <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider> -->
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.responses="{ item }">
        <v-btn color="event" @click="showResponses(item.event_id)">View</v-btn>
      </template>
      <template v-slot:item.feedback="{ item }">
        <v-btn color="event" @click="showFeedbacks(item.event_id)">View</v-btn>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          color="rgba(0, 0, 0, 0.87)"
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="rgba(0, 0, 0, 0.87)"
          class="mr-2"
          @click="copyToClipboard(item.event_id)"
        >
          mdi-clipboard
        </v-icon>
        <v-icon
          color="#3aa959"
          class="mr-2"
          @click="sendFeedbackMail(item.event_id)"
        >
          mdi-send-check
        </v-icon>
        <v-icon color="red" @click="deleteItem(item.event_id)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <event-responses
      :visible="eventResponseDialog"
      :responses="responses"
      @close="eventResponseDialog = false"
    ></event-responses>
    <event-feedbacks
      :feedbacks="feedbacks"
      :visible="eventFeedbackDialog"
      @close="eventFeedbackDialog = false"
    ></event-feedbacks>
    <edit-event
      :event="event"
      :visible="editEventDialog"
      @close="editEventDialog = false"
    ></edit-event>
  </v-container>
</template>

<script>
import Vue from "vue";
import EventResponses from "@/components/Events/EventResponses";
import axios from "axios";
import EditEvent from "../components/Events/EditEvent.vue";
import copy from "copy-to-clipboard";
import sendMail from "../mixins/send-email";
import EventFeedbacks from "../components/Events/EventFeedbacks.vue";

export default Vue.extend({
  name: "AllEvents",
  components: {
    EventResponses,
    EditEvent,
    EventFeedbacks,
  },
  mixins: [sendMail],
  data: () => ({
    search: null,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Event", value: "event_name", sortable: false },
      { text: "Speaker", value: "speaker_name" },
      { text: "Date", value: "event_date" },
      { text: "Time", value: "event_time" },
      { text: "Responses", value: "responses", sortable: false },
      { text: "Feedback", value: "feedback", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    events: [],
    event: {},
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    editEventDialog: false,
    eventId: null,
    responses: [],
    eventResponseDialog: false,
    eventFeedbackDialog: false,
    feedbacks: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getEvents();
  },

  methods: {
    copyToClipboard(id) {
      const url = `${window.location.origin}/event/register/${id}`;
      copy(url);
      this.$store.dispatch("showSnackbar", {
        showing: true,
        text: "Copied to clipboard",
        color: "success",
      });
    },
    async getEvents() {
      try {
        const response = await axios.get("http://localhost:3000/events");
        this.events = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    editItem(item) {
      this.event = item;
      this.editEventDialog = true;
    },

    async deleteItem(id) {
      try {
        await axios.delete(`http://localhost:3000/events/${id}`);
        this.getEvents();
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: "Event Deleted",
          color: "success",
        });
      } catch (error) {
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: error,
          color: "error",
        });
      }
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    async showResponses(eventId) {
      this.eventId = eventId;
      await this.getResponses();
      this.eventResponseDialog = true;
    },

    async showFeedbacks(eventId) {
      this.eventId = eventId;
      await this.getFeedbacks();
      this.eventFeedbackDialog = true;
    },

    async sendFeedbackMail(event_id) {
      this.eventId = event_id;
      let counter = 0;
      this.getResponses();
      for (const participant of this.responses) {
        await this.sendMail(participant);
        counter++;

        if (counter === this.responses.length) {
          this.$store.dispatch("showSnackbar", {
            showing: true,
            text: "Feedback sent",
            color: "success",
          });
        }
      }
    },

    async getFeedbacks() {
      try {
        const response = await axios.get(
          `http://localhost:3000/events/${this.eventId}/feedbacks`
        );
        this.feedbacks = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getResponses() {
      try {
        const response = await axios.get(
          `http://localhost:3000/events/${this.eventId}/responses`
        );
        this.responses = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>
.event__poster {
  border-radius: 50%;
}
.v-btn {
  color: #fff !important;
}

td {
  width: 115px;
}
</style>