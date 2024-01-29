<template>
    <div class="tab-navigation">
        <Tab v-for="(tab, index) in tabs" :key="index" :icon="tab.icon" :text="tab.text"
                :is-active="activeTab === index" @select="selectTab(index)"/>
    </div>
    <!-- <div class="workspace">
        <component :is="currentTabComponent"></component>
    </div> -->
</template>

<script>
import Tab from './Tab.vue';
import IconDashboard from '../../images/tab-icons/dashboard.svg';
import IconCalendar from '../../images/tab-icons/calendar.svg';
import IconNotification from '../../images/tab-icons/notification.svg';
import IconStat from '../../images/tab-icons/stat.svg';
import LearningComponent from "../../pages/LearningComponent.vue";

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
                {icon: IconDashboard, text: 'Мое обучение'},
                {icon: IconNotification, text: 'Уведомления'},
                {icon: IconCalendar, text: 'Календарь'},
                {icon: IconStat, text: 'Моя статистика'},
            ],
            tabComponents: {
                "Мое обучение": LearningComponent,
                "Уведомления": "NotificationsComponent",
                "Календарь": "CalendarComponent",
                "Статистика": "StatisticsComponent",
            },
            currentTabComponent: LearningComponent,
        };
    },
    methods: {
        selectTab(index) {
            this.activeTab = index;
            const tabText = this.tabs[index].text;
            this.currentTabComponent = this.tabComponents[tabText];
        },
    },
};
</script>

<style scoped lang="scss">
.tab-navigation {
    display: flex;
    flex-direction: column;
    padding: 50px 0 40px 50px;
    min-height: 100vh;
}

.workspace {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: 50px;
}
</style>
