<template>
    <div class="tab-navigation">
        <RouterLink
            v-for="(tab, index) in tabs"
                :key="index"
                :to="`/${tab.path}`"
                class="tab-navigation__link">
            <Tab 
                :icon="tab.icon"
                :text="tab.text"
                :is-active="activeTab === index"
                @select="selectTab(index)">
            </Tab>
        </RouterLink>
    </div>
</template>

<script>
import Tab from './Tab.vue';
import IconDashboard from '../../images/tab-icons/dashboard.svg';
import IconCalendar from '../../images/tab-icons/calendar.svg';
import IconNotification from '../../images/tab-icons/notification.svg';
import IconStat from '../../images/tab-icons/stat.svg';

export default {
    components: {
        Tab,
        IconDashboard,
        IconNotification,
        IconCalendar,
        IconStat,
    },
    data() {
        return {
            activeTab: 0,
            tabs: [
                {icon: IconDashboard, text: 'Мое обучение', path: 'tasks'},
                {icon: IconNotification, text: 'Уведомления', path: 'notifications'},
                {icon: IconCalendar, text: 'Календарь', path: 'calendar'},
                {icon: IconStat, text: 'Моя статистика', path: 'myStatistics'},
            ],
        };
    },
    methods: {
        selectTab(index) {
            this.activeTab = index;
        },
    },
};
</script>

<style scoped lang="scss">
.tab-navigation {
    display: flex;
    flex-direction: column;
    padding: 50px 0 40px 50px;
    height: calc(100vh - 100px);
    
    &__link {
        text-decoration: none;
    }
}

.workspace {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: 50px;
}
</style>
