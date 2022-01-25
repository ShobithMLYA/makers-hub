export default {
    state: {
        layoutText: {},
    },
    mutations: {
      setTitle(state: any, payload: any) {
        state.layoutText = payload;
      },
    },
    actions: {
      showTitle({ commit }: any, payload: any) {
        commit("setTitle", payload);
        console.log("hey 123")
      },
    },
  };
  