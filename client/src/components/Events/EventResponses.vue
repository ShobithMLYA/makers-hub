<template>
  <v-dialog v-model="show" max-width="700" persistent>
    <v-card>
      <v-card-title>
        All Registrations
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="responses" :search="search">
        <template v-slot:item.linked_in="{ item }">
          <a :href="item.linked_in" target="_blank">
            view
          </a>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="show = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EventResponses",
  props: ["visible", "responses"],
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "p_name",
        },
        { text: "Email Address", value: "p_email" },
        { text: "Mobile Number", value: "p_mobile" },
        { text: "Linked In", value: "linked_in" },
      ],
    };
  },
};
</script>