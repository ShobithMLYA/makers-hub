<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="availabilities"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:item.photo="{ item }">
      <div class="pa-2">
        <v-img :src="item.photo" :alt="item.name" height="50px" width="50px" class="event__poster"></v-img>
      </div>
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <!-- <v-toolbar-title>Speaker Availability</v-toolbar-title> -->
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
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="event"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              link
              to="request"
            >
              Request Availability
            </v-btn>
          </template> -->
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
    <template v-slot:item.status="{ item }">
      <v-btn
        color="event"
        class="mr-2"
      >
        {{item.status}}
      </v-btn>
    </template>
  </v-data-table>
  </v-container>
</template>

<script>
import Vue from 'vue';
import firebase from "firebase";
import { userId } from "../services/short_user";

  export default Vue.extend({
    name: "SpeakerAvailability",
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Photo', value: 'photo', align: 'start', sortable: false },
        {
          text: 'Speaker',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time' },
        { text: 'Info', value: 'description' },
        { text: 'Status', value: 'status', sortable: true },
      ],
      availabilities: [],
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
      firebase.firestore().collection("speakerAvailability").where("userId", "==", userId).onSnapshot((snapshot) => {
        this.availabilities = []
        snapshot.forEach((document) => {
          const data = document.data();
          this.availabilities.push(data);
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
    },
  })
</script>

<style>
  .event__poster {
    border-radius: 50%;
  }
</style>