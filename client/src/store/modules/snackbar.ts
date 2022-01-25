export default {
    state: {
        snackbar: {},
    },
    mutations: {
        setSnackbar(state: any, payload: any) {
            state.snackbar = payload;
        },
    },
    actions: {
        showSnackbar({ commit }: any, payload: any) {
            commit("setSnackbar", payload);
        },
    }
}