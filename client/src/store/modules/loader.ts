export default {
  state: {
    loader: {},
  },
  mutations: {
    setLoader(state: any, payload: any) {
      state.loader = payload;
    },
  },
  actions: {
    showLoader({ commit }: any, payload: any) {
      commit("setLoader", payload);
    },
  },
};
