import axios from 'axios';
import store from '@store/index.js';

const api = axios.create({
    baseURL: 'http://gocpa.education:8082',
    timeout: 10000
});
api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.code === 403) {
            localStorage.setItem('isAuth', false);
        }

        return Promise.reject(error);
    }
);

export async function get(url) {
    return api
        .get(url)
        .then(({ data }) => {
            if (data.message) {
                store.commit('toasts/ADD_SUCCESS', data.message);
            }
            return data.content ?? data;
        })
        .catch((e) => {
            store.commit('toasts/ADD_ERROR', e);
            return Promise.reject(e);
        });
}

export function post(url, payload) {
    return api
        .post(url, payload)
        .then(({ data }) => {
            if (data?.message) {
                store.commit('toasts/ADD_SUCCESS', data.message);
            }
            return data?.content || data;
        })
        .catch((e) => {
            store.commit('toasts/ADD_ERROR', e);
            return Promise.reject(e);
        });
}

export function del(url, payload) {
    return api
        .delete(url, { data: { ...payload } })
        .then(({ data }) => {
            if (data?.message) {
                store.commit('toasts/ADD_SUCCESS', data.message);
            }
            return data?.content || data;
        })
        .catch((e) => {
            store.commit('toasts/ADD_ERROR', e);
            return Promise.reject(e);
        });
}
