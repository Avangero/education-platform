import {get, post} from '../utils/index.js'

export default {
    namespaced: true,
    state: {
        loading: false,
        list: [
            {
                id: 1,
                title: 'Title',
                content: 'Text',
            },
            {
                id: 2,
                title: 'Title',
                content: 'Text',
            }
        ]
    },
    getters: {
        getList(state) {
            return state.list
        },
        getListItemById: (state) => (taskTemplateId) => {
            return state.list.find(taskTemplate => taskTemplate.id === Number(taskTemplateId))
        },
        getLoading(state) {
            return state.loading
        }
    },
    mutations: {
        SET_TASKS_TEMPLATES(state, {value}) {
            state.list = value
        },
        SET_LOADING(state, value) {
            state.loading = value
        },
        UPDATE_TASK_TEMPLATE(state, {value}) {
            state.list.find(taskTemplate => taskTemplate.id === Number(value.id)) = value;
        },
        CHANGE_TASK_TEMPLATE_TITLE(state, {value, taskTemplateId}) {
            state.list.find(taskTemplate => taskTemplate.id === Number(taskTemplateId)).title = value
        },
        CHANGE_TASK_TEMPLATE_CONTENT(state, {value, taskTemplateId}) {
            state.list.find(taskTemplate => taskTemplate.id === Number(taskTemplateId)).content = value
        },
        CEATE_TASK_TEMPLATE(state, {value}) {
            state.list.push(value)
        }
    },
    actions: {
        async getTasksTemplates({commit}) {
            commit('SET_LOADING', true)
            return await get('/api/mentor/tasks-templates/').then(({data}) => {
                commit('SET_TASKS_TEMPLATES', {value: data})
            }).catch(({response: {data}}) => {
                commit('SET_TASKS_TEMPLATES', [])
            }).finally(() => {
                commit('SET_LOADING', false)
            })
        },
        async createTaskTemplate({commit}) {
            commit('SET_LOADING', true)
            return await post('/api/mentor/tasks-templates/create').then(({data}) => {
                commit('CEATE_TASK_TEMPLATE', {value: data})
            }).catch(({response: {data}}) => {
                
            })
        },
        async saveTaskTemplate({commit, getters}, {taskTemplateId}) {
            return await post(`/api/mentor/tasks-templates/${taskTemplateId}`, getters.getListItemById(taskTemplateId)).then(({data}) => {
                commit('UPDATE_TASK_TEMPLATE', {value: data})
            }).catch(({response: {data}}) => {
                
            })
        }
    }
}
