<template>
  <v-app>
    <Layout v-if="currentUser !== null && typeof currentUser === 'object'" :title="title" />
    <v-main>
      <v-row class="fill-height mx-1">
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
});
</script>