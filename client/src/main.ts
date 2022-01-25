import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebase";
import vuetify from "@/plugins/vuetify";


// import VueGtag from "vue-gtag";

// Vue.use(VueGtag, {
//   config: { id: "UA-1234567-1" }
// });

firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false;

Vue.prototype.$API_URL = 'http://localhost:3000'

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
