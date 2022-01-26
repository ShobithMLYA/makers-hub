<template>
  <v-dialog v-model="show" max-width="700" persistent>
    <v-card>
      <v-card-title>
        All Feedbacks
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="feedbacks" :search="search">
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
  name: "EventFeedbacks",
  props: ["visible", "feedbacks"],
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
        { text: "Rating(5)", value: "rating" },
        { text: "Suggestions", value: "suggestions" },
      ],
    };
  },
};
</script>