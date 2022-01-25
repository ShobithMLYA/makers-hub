<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="speakers"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.photo="{ item }">
        <div class="pa-2">
          <v-img
            :src="item.photo"
            :alt="item.name"
            height="50px"
            width="50px"
            class="event__poster"
          ></v-img>
        </div>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              show-select
              outlined
              dense
            ></v-text-field>
          </v-toolbar-title>
          <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="event" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon class="mr-2">mdi-account-plus</v-icon>Add New Speaker
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="speaker.speaker_name"
                        label="Name"
                        outlined
                        prepend-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <template>
                        <v-file-input
                          v-model="speaker.speaker_photo"
                          label="Speaker Photo"
                          outlined
                        ></v-file-input>
                      </template>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="speaker.speaker_desg"
                        label="Role"
                        outlined
                        prepend-icon="mdi-school"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="speaker.speaker_email"
                        label="Email Address"
                        outlined
                        prepend-icon="mdi-email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="speaker.linked_in"
                        label="LinkedIn"
                        outlined
                        prepend-icon="mdi-linkedin"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="close"> Cancel </v-btn>
                <v-btn color="event" @click="addNewSpeaker">
                  Add Speaker
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
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
      <template v-slot:item.actions="{ item }">
        <v-icon
          color="rgba(0, 0, 0, 0.87)"
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-eye
        </v-icon>
        <v-icon
          color="rgba(0, 0, 0, 0.87)"
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon color="rgba(0, 0, 0, 0.87)" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { shortUser, userId } from "../services/short_user";
import firebase from "firebase";

export default Vue.extend({
  name: "AllSpeakers",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Photo", value: "photo", align: "start", sortable: false },
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Role", value: "designation" },
        { text: "Organisation", value: "organization" },
        { text: "Email", value: "email" },
        { text: "Number", value: "mobile" },
        { text: "LinkedIn", value: "linkedin" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      speaker: {
        speaker_name: null,
        speaker_desg: null,
        speaker_email: null,
        linked_in: null,
        speaker_photo: null,
      },
      speakers: [],
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
    };
  },

  created() {
    this.getSpeakers();
    // this.speaker.shortUser = shortUser[0];
    // this.speaker.userId = userId;
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Speaker" : "Edit Speaker";
    },
    // ...mapState({ speakers: (state) => state.speaker.speakers }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    async getSpeakers() {
      try {
        const response = await axios.get("https://localhost:3000/speakers");
        this.speakers = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
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

    async addNewSpeaker() {
      try {
        // this.$store.dispatch("addSpeaker", this.speaker);
        // this.$store.dispatch("showDialog", true);

        const formData = new FormData();
        Object.keys(this.speaker).forEach((key) => {
          formData.append(key, this.speaker[key]);
        });
        await axios.post(`http://localhost:3000/speakers`, formData);
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: "Speaker Added",
          color: "event",
        });
        this.dialog = false;
        // this.$store.dispatch("showDialog", false);
      } catch (error) {
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: error.message,
          color: "error",
        });
        // this.$store.dispatch("showDialog", false);
      }
    },
  },
});
</script>

<style>
.event__poster {
  border-radius: 50%;
}

/* td{
  width: 215px;
} */
</style>