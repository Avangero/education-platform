export default {
    namespaced: true,
    state: {
        errors: []
    },
    getters: {
        errors(state) {
            return state.errors;
        }
    },
    mutations: {
        ADD_ERROR(state, value) {
            state.errors.push(value);
        },
        CLEAR_ERRORS(state) {
            state.errors.splice(0, state.errors.length);
        }
    },
    actions: {
    }
}
