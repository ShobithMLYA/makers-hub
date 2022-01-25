import firebase from "firebase";

export default {
  state: {
    speakers: [],
  },
  mutations: {
    setSpeaker(state: any, payload: any) {
      state.speakers = payload;
    },
  },
  actions: {
    addSpeaker({ commit }: any, payload: any) {
      commit("setDialog", true);
      const firebaseStorageRef = firebase
        .storage()
        .ref()
        .child(`Speakers/${Date.now()}_file`)
        .put(payload.photo);
      firebaseStorageRef.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          commit("setProgress", progress);
        },
        (error) => {
          commit("setSnackbar", {
            showing: true,
            text: error.message,
            color: "error",
          });
          commit("setDialog", false);
        },
        async () => {
          const link = await firebaseStorageRef.snapshot.ref.getDownloadURL();
          payload["photo"] = link;
          console.log(payload);

          firebase
            .firestore()
            .collection("speakers")
            .add(payload);
          commit("setSpeaker", []);
          commit("setSnackbar", {
            showing: true,
            text: "Speaker Added",
            color: "event",
          });
        }
      );
      commit("setDialog", false);
    },

    getSpeakers({ commit }: any, payload: any) {
      commit("setSpeaker", []);

      const speakers: any[] = [];
      firebase
        .firestore()
        .collection("speakers")
        .where("userId", "==", payload.userId)
        .onSnapshot((snapshot: any) => {
          snapshot.forEach((document: any) => {
            const data = document.data();
            speakers.push(data);
          });
        });

      commit("setSpeaker", speakers);
    },
  },
};
