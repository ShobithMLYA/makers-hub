export default {
  state: {
    dialog: false,
    count: 0,
  },
  mutations: {
    setProgress(state: any, payload: number) {
      state.count = payload;
    },
    setDialog(state: any, payload: boolean) {
      state.dialog = payload;
    },
  },
  actions: {
    showProgress({ commit }: any, payload: number) {
      commit("setProgress", payload);
    },
    showDialog({ commit }: any, payload: boolean) {
      commit("setDialog", payload);
    },
  },
};
