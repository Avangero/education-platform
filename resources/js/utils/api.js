import axios from "axios";

const api = axios.create({
    baseURL: 'http://gocpa.education:8082',
    timeout: 10000
});
api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.code === 403) {
        localStorage.setItem('isAuth', false);
    }

    return Promise.reject(error);
});

export async function get(url) {
    return api.get(url).then((data) => {
        return data
    })
}

export function post(url, payload) {
    return api.post(url, payload).then((response) => {
        return response.data
    })
}

export function del(url, payload) {
    console.log('te', payload)
    return api.delete(url, {data: {...payload}}).then((response) => {
        return response.data
    })
}