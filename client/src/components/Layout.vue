<template>
  <div>
    <v-app-bar app color="white">
      <v-app-bar-nav-icon
        @click.stop="sidebarMenu = !sidebarMenu"
        color="event"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <div class="text-center">
        <h3>{{ currentUser.displayName }} - {{ title }}</h3>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-menu
        offset-y
      > -->
        <!-- <template v-slot:activator="{ attrs, on }">
          <v-btn
            class="ml-5"
            color="black"
            v-bind="attrs"
            v-on="on"
            icon
          >
          <v-badge content="6" color=
          "red">
          <v-icon color="black">mdi-bell</v-icon></v-badge>
        </v-btn>
        </template> -->

        <!-- <v-list>
          <v-list-item>
            <v-list-item-title link>
              <h1>Notification1</h1>
            </v-list-item-title>
            <v-list-item-title link>
              <h1>Notification2</h1>
            </v-list-item-title>
            <v-list-item-title link>
              <h1>Notification3</h1>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <v-icon
        @click="logout()"
        class="mr-5 ml-5"
        color="black"
      >mdi-logout</v-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="sidebarMenu"
      app
      floating
      :permanent="sidebarMenu"
      :mini-variant.sync="mini"
    >
      <v-list dense color="white" dark>
        <v-list-item>
          <!-- <v-list-item-action>
            <v-icon @click.stop="sidebarMenu = !sidebarMenu" color="black"
              >mdi-chevron-left</v-icon
            >
          </v-list-item-action> -->
          <v-list-item-content>
            <v-list-item-title>
              <img
                :src="require(`../uploads/organisation/${currentUser.photoURL}`)"
                :alt="currentUser.displayName"
                width="175px"
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <v-list-item class="px-2" @click="toggleMini = !toggleMini">
        <v-list-item-avatar>
          <v-img :src="currentUser.photoURL"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="text-truncate">
          {{ currentUser.displayName }}
        </v-list-item-content>
        <v-btn icon small>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item> -->
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.href"
        >
          <v-list-item-icon>
            <v-icon color="dark">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="event--text">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="pa-2 text-center">
        <h4 class="text--secondary" style="font-size: 12px !important;">Powered by</h4>
        <a href="https://thestartupreneur.co/#page1" target="_blank">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/MA_Standard_-_Color.png"
            alt="The Startupreneur"
            width="200"
          />
        </a>
      </div>
      <!-- <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="toggleTheme" color="event" class="mr-2" block>{{
            buttonText
          }}</v-btn>
        </div>
      </template> -->
    </v-navigation-drawer>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "Layout",
  computed: {
    ...mapState({ currentUser: (state) => state.user.currentUser }),
    mini() {
      return this.$vuetify.breakpoint.smAndDown || this.toggleMini;
    },
    buttonText() {
      return !this.$vuetify.theme.dark ? "Go Dark" : "Go Light";
    },
  },
  props: ["title"],
  data: () => ({
    sidebarMenu: true,
    toggleMini: false,
    items: [
      { title: "Dashboard", href: "/dashboard", icon: "mdi-home-outline" },
      { title: "Events", href: "/events", icon: "mdi-calendar-multiple" },
      // { title: "Create Event", href: "/create", icon: "mdi-calendar-plus" },
      { title: "Speakers", href: "/speakers", icon: "mdi-account-multiple" },
      // { title: "Request Speaker", href: "/request", icon: "mdi-send" },
      // {
      //   title: "Speaker Availability",
      //   href: "/availability",
      //   icon: "mdi-teach",
      // },
      // { title: "Community", href: "/community", icon: "mdi-account-multiple" },
      {
        title: "Participants",
        href: "/participants",
        icon: "mdi-account-group-outline",
      },
    ],
  }),
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
});
</script>

<style>
.v-application a {
  color: #000 !important;
  text-decoration: none !important;
}

.theme--light.v-list-item--active:before {
  /* opacity: 0 !important; */
}

/* .v-list .v-list-item {
  box-shadow: 0px 0px 10px !important;
  border-radius: 30px !important;
  margin: 18px 10px !important;
} */

.v-sheet.v-toolbar {
  box-shadow: none !important;
}
</style>