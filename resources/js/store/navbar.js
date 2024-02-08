import IconDashboard from '../src/images/tab-icons/dashboard.svg';
import IconCalendar from '../src/images/tab-icons/calendar.svg';
import IconNotification from '../src/images/tab-icons/notification.svg';
import IconStat from '../src/images/tab-icons/stat.svg';

export default {
    namespaced: true,
    state: {
        isShow: true,
        activeTab: 0,
        navbarList: [
            {icon: 'pi pi-home', label: 'Мое обучение', route: 'tasks', accessToRoles: [1,2,3]},
            {icon: 'pi pi-bell', label: 'Уведомления', route: 'notifications', accessToRoles: [1,2,3]},
            {icon: 'pi pi-calendar', label: 'Календарь', route: 'calendar', accessToRoles: [1,2,3]},
            {icon: 'pi pi-chart-bar', label: 'Моя статистика', route: 'myStatistics', accessToRoles: [1,2,3]},
            {icon: 'pi pi-plus-circle', label: 'Шаблоны курсов', route: 'courses-templates', accessToRoles: [1,2]},
            {icon: 'pi pi-plus-circle', label: 'Шаблоны задач', route: 'tasks-templates', accessToRoles: [1,2]},
        ],
    },
    getters: {
        getNavbarForRole(state, getters, rootState, rootGetters) {
            return state.navbarList.filter((navbarItem) => navbarItem.accessToRoles.includes(rootGetters['auth/user'].role_id))
        },
        getActiveTab(state) {
            return state.activeTab
        },
        isShow(state) {
            return state.isShow
        }
    },
    mutations: {
        SET_ACTIVE_TAB(state, value) {
            state.activeTab = value
        },
        TOGGLE_VISIBILITY(state) {
            console.log(123)
            state.isShow = !state.isShow
        }
    }
}
