<template>
  <div class="home">
    <v-row>
      <v-col cols="12">
        <v-img
          src="https://thestartupreneur.co/img/Startupreneur-Logo_Black_Regd%20(1).png"
          width="350"
          class="logo"
          alt="The Startupreneur"
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" md="6">
        <v-row>
          <v-col>
            <h1 class="text-center mt-5">Maker's Hub</h1>
            <h3 class="text-center text--secondary mt-5">Event Management Portal</h3>
          </v-col>
        </v-row>
        <Login />
      </v-col>
      <v-col cols="6" md="6">
        <v-img
          src="https://img.freepik.com/free-vector/flat-isometric-vector-design_68094-97.jpg?size=626&ext=jpg"
          alt="Home Banner"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Login from "@/components/Auth/Login.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Login
  },
});
</script>

<style scoped>
.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
