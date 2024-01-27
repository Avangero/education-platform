import axios from "axios";

const api = axios.create({
    baseURL: 'http://gocpa.education/',
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
    return api.post(url, payload).then((data) => {
        return data
    })
}
