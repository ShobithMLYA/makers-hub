<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title class="heading d-block text-center"
        >Event Feedback Form</v-card-title
      >
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p style="font-size: 20px; color: #000">Overall Rating</p>
            <v-rating
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              half-increments
              hover
              large
              v-model="feedback.rating"
            >
            </v-rating>
            <p style="font-size: 20px; color: #000" class="mt-5">
              Any Suggestions?
            </p>
            <v-textarea outlined v-model="feedback.suggestions"></v-textarea>
            <v-btn color="event" class="d-block mx-auto" dark @click="submit"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "Feedback",
  data: () => ({
    feedback: {
      rating: 0,
      suggestions: "",
    },
  }),
  methods: {
    async submit() {
      try {
        this.feedback.event_id = this.$route.params.eId;
        this.feedback.p_id = this.$route.params.pId;

        const response = await axios.post(
          "http://localhost:3000/feedback",
          this.feedback
        );

        if (response.data.status === 409) {
          this.$store.dispatch("showSnackbar", {
            showing: true,
            text: response.data.message,
            color: "warning",
          });
          return
        }

        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: "Feedback submitted successfully",
          color: "event",
        });

        this.feedback = {
          rating: 0,
          suggestions: "",
        };

        // setTimeout(() => {
        //   window.close();
        // }, 2000);
      } catch (error) {
        console.log(error);
        this.$store.dispatch("showSnackbar", {
          showing: true,
          text: error,
          color: "error",
        });
      }
    },
  },
});
</script>