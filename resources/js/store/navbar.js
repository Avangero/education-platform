import IconDashboard from '../src/images/tab-icons/dashboard.svg';
import IconCalendar from '../src/images/tab-icons/calendar.svg';
import IconNotification from '../src/images/tab-icons/notification.svg';
import IconStat from '../src/images/tab-icons/stat.svg';

export default {
    namespaced: true,
    state: {
        navbarList: [
            {icon: IconDashboard, text: 'Мое обучение', path: 'tasks', accessToRoles: [1,2,3]},
            {icon: IconNotification, text: 'Уведомления', path: 'notifications', accessToRoles: [1,2,3]},
            {icon: IconCalendar, text: 'Календарь', path: 'calendar', accessToRoles: [1,2,3]},
            {icon: IconStat, text: 'Моя статистика', path: 'myStatistics', accessToRoles: [1,2,3]},
            {icon: IconDashboard, text: 'Шаблоны курсов', path: 'courses-templates', accessToRoles: [1,2]},
            {icon: IconDashboard, text: 'Шаблоны задач', path: 'tasks-templates', accessToRoles: [1,2]},
        ],
    },
    getters: {
        getNavbarForRole(state, getters, rootState, rootGetters) {
            return state.navbarList.filter((navbarItem) => navbarItem.accessToRoles.includes(rootGetters['auth/user'].role_id))
        }
    }
}
