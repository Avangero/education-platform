import { get } from '../utils/index.js';
import router from '../src/router/index.js';

export default {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    SET_USER(state, value) {
      state.user = value;
    }
  },
  actions: {
    getUser({ commit }) {
      get('/api/user')
        .then((data) => {
          commit('SET_USER', data);
        })
        .catch(() => {
          commit('SET_USER', {});
          localStorage.setItem('isAuth', 'false');
          router.push({ name: 'login' });
        });
    },
    logout({ commit }) {
      commit('SET_USER', {});
      localStorage.setItem('isAuth', 'false');
      router.push({ name: 'login' });
    },
    login() {
      router.push({ name: 'tasks' });
    }
  }
};
