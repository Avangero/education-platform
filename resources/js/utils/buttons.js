import store from '../store/index.js'
export const buttons = [
    {
        label: 'Выполнено',
        icon: 'pi pi-check',
        severity: 'success',
        command: (taskId) => store.dispatch('tasks/setStatus', {taskId, status: 1}),
    },
    {
        label: 'В работе',
        icon: 'pi pi-pencil',
        severity: 'info',
        command: (taskId) => store.dispatch('tasks/setStatus', {taskId, status: 2})
    },
    {
        label: 'На проверке',
        icon: 'pi pi-search',
        severity: 'help',
        command: (taskId) => store.dispatch('tasks/setStatus', {taskId, status: 2})
    },
    {
        label: 'Не начато',
        icon: 'pi pi-clock',
        severity: 'secondary',
        command: (taskId) => store.dispatch('tasks/setStatus', {taskId, status: 2})
    }
]