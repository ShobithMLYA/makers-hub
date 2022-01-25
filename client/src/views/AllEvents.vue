<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="events"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
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
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
              
            <v-btn
              color="event"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              link
              to="/create"
            >
              <v-icon class="mr-2">mdi-calendar-plus</v-icon> Create New Event
            </v-btn>
            
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
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
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.responses="{ item }">
      <v-btn color="event" @click="showResponses(item.docId)">View</v-btn>
    </template>
     <template v-slot:item.feedback>
      <v-btn color="event">View</v-btn>
    </template>
    <template v-slot:item.actions>
       <v-icon color="rgba(0, 0, 0, 0.87)" class="mr-2" @click="editItem(item)">
          mdi-eye
        </v-icon>
        <v-icon color="rgba(0, 0, 0, 0.87)" class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="rgba(0, 0, 0, 0.87)" class="mr-2"  @click="deleteItem(item)"> mdi-clipboard </v-icon>
        <v-icon color="rgba(0, 0, 0, 0.87)" @click="deleteItem(item)"> mdi-delete </v-icon>

       <!-- <v-icon
      color="event"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
      color="primary"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
      color="red"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon> -->
    </template>
  </v-data-table>
  <EventResponses />
  </v-container>
</template>

<script>
import Vue from 'vue';
import firebase from "firebase";
import { userId } from "../services/short_user";
import EventResponses from "@/components/Events/EventResponses"
  export default Vue.extend({
    name: "AllEvents",
    components: {
      EventResponses
    },
    data: () => ({
      search: null,
      dialog: false,
      dialogDelete: false,
      headers: [
        // { text: 'Posters', value: 'image', align: 'start', sortable: false },
        // {
        //   text: 'Type',
        //   align: 'start',
        //   sortable: false,
        //   value: 'type',
        // },
        { text: 'Event', value: 'title', sortable: false },
        { text: 'Speaker', value: 'speakerText' },
        { text: 'Date', value: 'date'},
        { text: 'Time', value: 'time' },
        { text: 'Responses', value: 'responses', sortable: false },
        { text: 'Feedback', value: 'feedback', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      events: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

     created () {
      firebase.firestore().collection("events").where("userId", "==", userId).onSnapshot((snapshot) => {
        this.events = []
        snapshot.forEach((document) => {
          const data = document.data();
          this.events.push(data);
        })
      })
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },

      showResponses(eventId){
        this.$store.dispatch("showResponses", {isShowing: true, eventId: eventId});
      }
    },
  })
</script>

<style>
  .event__poster {
    border-radius: 50%;
  }
  .v-btn{
    color: #fff !important;
  }

  td{
    width: 115px;
  }
</style>