import { get, post, del } from '../utils/index.js';

export default {
    namespaced: true,
    state: {
        loading: false,
        course: {}
    },
    getters: {
        getTasks(state) {
            return state.course?.tasks;
        },
        getTaskById: (state) => (taskId) => {
            return state.course.tasks.find((task) => task.id === taskId);
        },
        getCourseInfo(state) {
            const { tasks, ...copiedObject } = state.course;
            return copiedObject;
        },
        getLoading(state) {
            return state.loading;
        }
    },
    mutations: {
        SET_TASKS(state, value) {
            state.course.tasks = value;
        },
        SET_COURSE(state, value) {
            state.course = value;
        },
        ADD_COMMENT(state, { value, taskId }) {
            state.course.tasks
                .find((task) => task.id === Number(taskId))
                .comments.push(value);
        },
        SET_LOADING(state, value) {
            state.loading = value;
        },
        REMOVE_ANSWER(state, { taskId, fileName }) {
            const answers = state.course.tasks.find(
                (task) => task.id === Number(taskId)
            ).answers;
            const answerIndex = answers.findIndex(
                (answer) => answer.name === fileName
            );
            answers.splice(answerIndex, 1);
        },
        SET_STATUS(state, { taskId, status }) {
            state.course.tasks.find(
                (task) => task.id === Number(taskId)
            ).status = status;
        }
    },
    actions: {
        async getTasks({ commit }) {
            commit('SET_LOADING', true);
            return await get('/api/student/courses/tasks/')
                .then((data) => {
                    commit('SET_COURSE', data.course);
                })
                .catch(() => {
                    commit('SET_COURSE', []);
                })
                .finally(() => {
                    commit('SET_LOADING', false);
                });
        },
        submitAnswer({}, { taskId, files }) {
            return post(`/api/student/courses/tasks/${taskId}/answer`, files);
        },
        removeAnswer({ commit }, { taskId, fileName }) {
            del(`/api/student/courses/tasks/${taskId}/answer`, {
                name: fileName
            }).then(() => {
                commit('REMOVE_ANSWER', { taskId, fileName });
            });
        },
        submitComment({ commit }, { taskId, commentText }) {
            post(`/api/student/courses/tasks/${taskId}/comment`, {
                content: commentText
            }).then((data) => {
                commit('ADD_COMMENT', { value: data, taskId: Number(taskId) });
            });
        },
        setStatus({ commit }, { taskId, status }) {
            post(`/api/student/courses/tasks/${taskId}/status`, {
                status: status
            }).then((data) => {
                commit('SET_STATUS', { taskId: taskId, status: data.status });
            });
        }
    }
};
