<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-text-field
            outlined
            prepend-icon="mdi-email"
            label="Email Address"
            v-model="email"
            :rules="rules.emailRules"
          ></v-text-field>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-text-field
            outlined
            prepend-icon="mdi-lock"
            label="Password"
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="rules.passwordRules"
            @click:append="show = !show"
          ></v-text-field>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <v-btn color="event" block @click="validateLogin()"
            >LOGIN <v-icon light>mdi-login</v-icon></v-btn
          >
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      show: false,
      rules: {
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        passwordRules: [(v) => !!v || "Password is required"],
      },
    };
  },
  methods: {
    validateLogin() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
});
</script>

<style>
</style>