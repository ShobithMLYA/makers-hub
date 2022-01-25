export default {
    state: {
        response: {},
    },
    mutations: {
        setResponses(state: any, payload: any) {
            state.response = payload;
        },
    },
    actions: {
        showResponses({ commit }: any, payload: any) {
            commit("setResponses", payload);
        },
    }
}
