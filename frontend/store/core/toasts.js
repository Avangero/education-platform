export default {
    namespaced: true,
    state: {
        errors: [],
        successes: []
    },
    getters: {
        errors(state) {
            return state.errors;
        },
        successes(state) {
            return state.successes;
        }
    },
    mutations: {
        ADD_ERROR(state, value) {
            state.errors.push(value);
        },
        CLEAR_ERRORS(state) {
            state.errors.splice(0, state.errors.length);
        },
        ADD_SUCCESS(state, value) {
            state.successes.push(value);
        },
        CLEAR_SUCCESSES(state) {
            state.successes.splice(0, state.successes.length);
        }
    },
    actions: {}
};
