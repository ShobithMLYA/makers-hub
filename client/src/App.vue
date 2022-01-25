<template>
  <v-app>
    <Layout v-if="Object.keys(currentUser).length !== 0" :title="title" />
    <v-main>
      <v-row class="fill-height">
        <v-col>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </v-col>
      </v-row>
    </v-main>
    <Snackbar />
    <Loader />
    <ProgressDialog />
  </v-app>
</template>
<script>
import Vue from "vue";
import Snackbar from "@/components/Snackbar";
import Layout from "@/components/Layout";
import Loader from "@/components/Loaders/Loader";
import ProgressDialog from "@/components/Loaders/ProgressDialog";
import { mapState } from "vuex";

export default Vue.extend({
  components: {
    Snackbar,
    Layout,
    Loader,
    ProgressDialog,
  },
  data: () => ({
    title: null,
  }),
  computed: {
    ...mapState(
      { currentUser: (state) => state.user.currentUser },
      { isLoggedIn: (state) => state.user.isLoggedIn }
    ),
  },
  created() {
    // const location = window.location.href;
    // this.title =
    //   location.split("/")[3].charAt(0).toUpperCase() +
    //   location.split("/")[3].substring(1);

    this.$store.commit("setLoader", { isLoading: true });
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
      this.$store.commit("setUser", userDetails);
      this.$store.commit("setLoggedIn", true);
      this.$store.commit("setLoader", { isLoading: false });
      // this.$store.dispatch("getSpeakers", {
      //   userId: userDetails.org_id,
      // });
    } else {
      console.log("logged out");
        this.$store.commit("setUser", {});
        this.$store.commit("setLoggedIn", false);
        this.$store.commit("setLoader", { isLoading: false });
    }
    this.$store.commit("setLoader", { isLoading: false });
  },
});
</script>