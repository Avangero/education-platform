import store from '../store/index.js';
export const buttons = [
  {
    label: 'Не начато',
    severity: 'danger',
    command: (taskId) =>
      store.dispatch('tasks/setStatus', { taskId, status: 1 })
  },
  {
    label: 'В работе',
    severity: 'info',
    command: (taskId) =>
      store.dispatch('tasks/setStatus', { taskId, status: 2 })
  },
  {
    label: 'На проверке',
    severity: 'secondary',
    command: (taskId) =>
      store.dispatch('tasks/setStatus', { taskId, status: 3 })
  },
  {
    label: 'Выполнено',
    severity: 'success',
    command: (taskId) =>
      store.dispatch('tasks/setStatus', { taskId, status: 4 })
  }
];
