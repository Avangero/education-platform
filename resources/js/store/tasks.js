import {get, post} from '../utils/index.js'

export default {
    namespaced: true,
    state: {
        list: [
            {
                id: 1,
                title: "Книга “Погружение в рефакторинг 1”",
                content: "Прочитать, написать эссе в формате markdown, рецензию на книгу. В эссе так же указать какие приемы ты уже использовала с примерами своего кода, взять свои реквесты и применить на них новый изученный материал, вставить кусочек кода и написать какой прием надо было использовать и почему, а так же приложить исправленную версию.",
                status: "Выполнено",
                commentsCount: 10,
                filesCount: 2,
                comments: [{id: 1, text: '123123123'}, {id: 2, text: 'test123'}, {
                    id: 3,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                }]
            },
            {
                id: 2,
                title: "Книга “Погружение в рефакторинг 2”",
                content: "Прочитать, написать эссе в формате markdown, рецензию на книгу. В эссе так же указать какие приемы ты уже использовала с примерами своего кода, взять свои реквесты и применить на них новый изученный материал, вставить кусочек кода и написать какой прием надо было использовать и почему, а так же приложить исправленную версию.",
                status: "На проверке",
                commentsCount: 5,
                filesCount: 1,
            },
            {
                id: 3,
                title: "Книга “Погружение в рефакторинг 3”",
                content: "Прочитать, написать эссе в формате markdown, рецензию на книгу. В эссе так же указать какие приемы ты уже использовала с примерами своего кода, взять свои реквесты и применить на них новый изученный материал, вставить кусочек кода и написать какой прием надо было использовать и почему, а так же приложить исправленную версию.",
                status: "В работе",
                commentsCount: 2,
                filesCount: 0,
            },
            {
                id: 4,
                title: "Книга “Погружение в рефакторинг”",
                content: "Прочитать, написать эссе в формате markdown, рецензию на книгу. В эссе так же указать какие приемы ты уже использовала с примерами своего кода, взять свои реквесты и применить на них новый изученный материал, вставить кусочек кода и написать какой прием надо было использовать и почему, а так же приложить исправленную версию.",
                status: "Не начато",
                commentsCount: 0,
                filesCount: 1,
            },
            {
                id: 5,
                title: "Книга “Погружение в рефакторинг”",
                content: "Прочитать, написать эссе в формате markdown, рецензию на книгу. В эссе так же указать какие приемы ты уже использовала с примерами своего кода, взять свои реквесты и применить на них новый изученный материал, вставить кусочек кода и написать какой прием надо было использовать и почему, а так же приложить исправленную версию.",
                status: "Не начато",
                commentsCount: 0,
                filesCount: 0,
            },
            {
                id: 6,
                title: "Книга “Погружение в рефакторинг”",
                content: "Прочитать, написать эссе в формате markdown, рецензию на книгу. В эссе так же указать какие приемы ты уже использовала с примерами своего кода, взять свои реквесты и применить на них новый изученный материал, вставить кусочек кода и написать какой прием надо было использовать и почему, а так же приложить исправленную версию.",
                status: "Не начато",
                commentsCount: 0,
                filesCount: 0,
            },
        ],
    },
    getters: {
        getTasksList(state) {
            return state.list
        },
        getTaskById: (state) => (taskId) => {
            return state.list.find(task => task.id === taskId)
        }
    },
    mutations: {
        SET_TASKS(state, value) {
            state.list = value
        },
    },
    actions: {
        getTasks({commit}) {
            return get('/api/tasks').then(({data}) => {
                commit('SET_TASKS', data)
            }).catch(({response: {data}}) => {
                commit('SET_TASKS', [])
            })
        },
        submitAnswer({}, {taskId, file}) {
            post(
                `/api/answer/${taskId}`,
                file,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then((response) => {
                console.log(response);
            })
                .catch((error) => {
                    console.log(error);
                });
        },
        submitComment({}, {taskId, commentText}) {
            post(`/api/comment/${taskId}`, commentText).then((response) => {
                console.log(response);
            })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
