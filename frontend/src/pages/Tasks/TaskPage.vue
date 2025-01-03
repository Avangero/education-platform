<template>
    <Toast />
    <div v-if="!getLoading" class="task">
        <div class="task-body">
            <div class="task-header">
                <h1 class="task-title">{{ task.title }}</h1>
                <TaskInfo :task="task" />
            </div>
            <div class="task-content content">{{ task.content }}</div>
            <CommentList :comments="task.comments" />
            <EPFileUpload :task="task" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Toast from 'primevue/toast';
import EPFileUpload from '@components/EP/EPFileUpload.vue';
import TaskInfo from '@components/Tasks/Task/TaskInfo.vue';
import CommentList from '@components/Tasks/Comments/CommentList.vue';

export default {
    name: 'TaskComponent',
    components: { TaskInfo, EPFileUpload, Toast, CommentList },

    async created() {
        await this.getTasks();
    },
    computed: {
        ...mapGetters({
            getTaskById: 'tasks/getTaskById',
            getCourseInfo: 'tasks/getCourseInfo',
            getLoading: 'tasks/getLoading',
            getUser: 'auth/user'
        }),
        task() {
            return this.getTaskById(Number(this.taskId));
        },
        taskId() {
            return this.$route.params.id;
        }
    },
    methods: {
        ...mapActions({
            getTasks: 'tasks/getTasks'
        })
    }
};
</script>

<style scoped lang="scss">
@import '@styles/variables';

.task {
    display: flex;
    justify-content: space-between;
}

.task-body {
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.content {
    margin-top: 2rem;
    font-size: 1.125rem;
    line-height: 1.8rem;
    letter-spacing: normal;
    text-align: start;
}

.task-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 0;
    height: 10%;
    border-radius: 24px;
}

.task-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: $text-main;
    margin-right: auto;
}
</style>
