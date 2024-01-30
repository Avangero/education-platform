import {get, post} from '../utils/index.js'

export default {
    namespaced: true,
    state: {
        loading: false,
        course: {},
    },
    getters: {
        getTasks(state) {
            return state.course.tasks
        },
        getTaskById: (state) => (taskId) => {
            return state.course.tasks.find(task => task.id === taskId)
        },
        getCourseInfo(state) {
            const { tasks, ...copiedObject } = state.course;
            return copiedObject
        },
        getLoading(state) {
            return state.loading
        }
    },
    mutations: {
        SET_TASKS(state, value) {
            state.list = value
        },
        SET_COURSE(state, value) {
            state.course = value
        },
        ADD_COMMENT(state, {value, taskId}) {
            state.list.find((task) => task.id === Number(taskId)).comments.push(value);
        },
        SET_LOADING(state, value) {
            state.loading = value
        }
    },
    actions: {
        async getTasks({commit}) {
            commit('SET_LOADING', true)
            return await get('/api/student/courses/tasks/').then(({data}) => {
                commit('SET_COURSE', data.course)
            }).catch(({response: {data}}) => {
                commit('SET_COURSE', [])
            }).finally(() => {
                commit('SET_LOADING', false)
            })
        },
        submitAnswer({}, {taskId, files}) {
            post(
                `/api/student/courses/tasks/${taskId}/answer`,
                files,
                // {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // }
            ).then((response) => {
                console.log(response);
            })
                .catch((error) => {
                    console.log(error);
                });
        },
        submitComment({commit}, {taskId, commentText}) {
            post(`/api/student/courses/tasks/${taskId}/comment`, {text: commentText}).then((response) => {
                commit('ADD_COMMENT', {value: response, taskId: taskId});
            })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
