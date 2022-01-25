<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="participants"
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
                        show-select
                    ></v-text-field>
          </v-toolbar-title>
          <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn color="event" dark class="mb-2" v-bind="attrs" v-on="on">
                Add New Participant
              </v-btn>
            </template> -->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="participant.name"
                        label="Name"
                        outlined
                        prepend-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="participant.designation"
                        label="Role"
                        outlined
                        prepend-icon="mdi-school"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="participant.organization"
                        label="Organization"
                        outlined
                        prepend-icon="mdi-bank"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="participant.email"
                        label="Email Address"
                        outlined
                        prepend-icon="mdi-email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="participant.mobile"
                        label=" Number"
                        outlined
                        prepend-icon="mdi-phone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                            v-model="participant.community"
                            :items="communities"
                            label="Add to Community"
                            persistent-hint
                            outlined
                            prepend-icon="mdi-account"
                            @change="showAddNewDialog"
                        ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="close"> Cancel </v-btn>
                <v-btn color="event" @click="addNewParticipant">
                  Add Participant
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
          <v-dialog v-model="addNewCommunityDialog" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Add New Community</v-card-title
              >
              <v-card-text>
                  <v-text-field
                    outlined
                    prepend-icon="mdi-account-multiple"
                    v-model="newCommunity"
                  ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="addNewCommunityDialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="event darken-1" text @click="addNewCommunity"
                  >Add</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- <v-icon color="event" class="mr-2" @click="editItem(item)">
          mdi-eye
        </v-icon> -->
        <v-icon color="event" class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Vue from "vue";
import { shortUser, userId } from "../../services/short_user";
import firebase from "firebase";

export default Vue.extend({
  name: "Participants",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Role", value: "designation",  sortable: true },

        { text: "Organisation", value: "organization",  sortable: true },
        { text: "Email", value: "email",  sortable: true },
        { text: "Number", value: "mobile",  sortable: true },
        { text: "Community", value: "community",  sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
      search: null,
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
      },
      participants: [],
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
      communities: [],
      addNewCommunityDialog: false,
      newCommunity: null
    };
  },

  created() {
    firebase.firestore().collection("participants").where("userId", "==", userId).onSnapshot((snapshot) => {
        this.participants = []
        snapshot.forEach((document) => {
          const data = document.data();
          this.participants.push(data);
        })
      })

    firebase.firestore().collection('communities').doc(userId).onSnapshot((snapshot => {
        this.communities = []
        const data = snapshot.data()['communities'];
        this.communities = data
        console.log(data);
    }))

    this.participant.shortUser = shortUser[0];
    this.participant.userId = userId;
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Participant" : "Edit Participants";
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

  methods: {
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

    addNewParticipant() {
        this.dialog = false;
        
        firebase
        .firestore()
        .collection("participants")
        .add(this.participant);

        this.$store.dispatch("showSnackbar", {
            showing: true,
            text: "Participant Added",
            color: "event",
        });
        this.$store.dispatch("showDialog", false);
    },

    showAddNewDialog(){
        if(this.participant.community === "New Community")
            this.addNewCommunityDialog = true
    },

    addNewCommunity(){
        if(this.communities.includes(this.newCommunity)){
            this.$store.dispatch("showSnackbar", {
                showing: true,
                text: "Community Already Exists",
                color: "warning",
            });
            return
        }
        this.communities.splice(this.communities.length - 1, 0, this.newCommunity);
        this.communities.join()
        firebase.firestore().collection("communities").doc(userId).set({'communities': this.communities}, {merge: true})

        this.$store.dispatch("showSnackbar", {
            showing: true,
            text: "Community Added",
            color: "event",
        });
        this.addNewCommunityDialog = false
        this.newCommunity = null
    }
  },
});
</script>

<style>
.event__poster {
  border-radius: 50%;
}
</style>