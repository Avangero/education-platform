import store from '../store/index.js'
export const toolbar = {
    'task-template': {
        buttons: [
            {
                id: 1,
                label: 'Сохранить',
                severity: 'success',
                action: ({taskTemplateId}) => store.dispatch('tasksTemplates/saveTaskTemplate', {taskTemplateId}),
            }
        ]
    }
}