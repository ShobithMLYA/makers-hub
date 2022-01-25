import firebase from "firebase";
import router from "@/router";
import axios from "axios";

export default {
  state: {
    isLoggedIn: false,
    currentUser: {},
  },
  mutations: {
    setUser(state: any, payload: any) {
      state.currentUser = payload;
      localStorage.setItem("currentUser", payload);
      localStorage.setItem("userId", payload.uid);
    },
    setLoggedIn(state: any, payload: boolean) {
      state.isLoggedIn = payload;
    },
  },
  actions: {
    async login({ commit }: any, payload: any) {
      commit("setLoader", { isLoading: true });

      try {
        const response = await axios.post(
          `http://localhost:3000/organisations/login`,
          {
            org_email: payload.email,
            org_password: payload.password
          }
        );
        
        const data = response.data.data
        
        // console.log(data)
        
        const userDetails = {
          uid: data.org_id,
          displayName: data.org_name,
          photoURL: data.org_logo,
          email: data.org_email,
        };
        // console.log(userDetails)
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        commit("setUser", userDetails);
        commit("setLoggedIn", true);
        router.push("/dashboard");
        commit("setLoader", { isLoading: false });
      } catch (error) {
        commit("setSnackbar", {
          showing: true,
          text: error.message,
          color: "error",
        });
        commit("setLoader", { isLoading: false });
      }
    },

    logout({ commit }: any) {
      commit("setLoader", { isLoading: true });
      firebase.auth().signOut();
      commit("setUser", {});
      commit("setLoggedIn", false);
      localStorage.setItem("currentUser", "");
      localStorage.setItem("userId", "");
      router.push("/");
      commit("setLoader", { isLoading: false });
    },
  },
};
