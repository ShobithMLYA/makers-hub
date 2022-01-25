import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import snackbar from "./modules/snackbar";
import loader from "./modules/loader";
import speaker from "./modules/speaker";
import progress from "./modules/progress";
import event from "./modules/event";
import layout from "./modules/layout";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    snackbar,
    loader,
    speaker,
    progress,
    event,
    layout
  },
});
