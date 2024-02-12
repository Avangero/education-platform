<template>
    <Toast />
    <div v-if="!getLoading" class="task">
        <div class="task-body">
            <TaskHeader :task="task" :mentorInfo="getCourseInfo.mentor" />
            <div class="task-content content">{{ task.content }}</div>
            <div class="panel-tools">
                <TaskInfo :task="task" />
            </div>
            <CommentList :comments="task.comments" />
            <EPFileUpload :task="task" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskHeader from '../../components/Tasks/Task/TaskHeader.vue';
import Toast from 'primevue/toast';
import EPFileUpload from '../../components/EP/EPFileUpload.vue';
import TaskInfo from '../../components/Tasks/Task/TaskInfo.vue';
import CommentList from '../../components/Tasks/Comments/CommentList.vue';

export default {
    name: 'TaskComponent',
    components: { TaskInfo, EPFileUpload, TaskHeader, Toast, CommentList },

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
@import '../../styles/variables';

.task {
    display: flex;
    justify-content: space-between;
}

.task-body {
    height: 100%;
    padding: 2rem;
}

.content {
    margin-top: 2rem;
    font-size: 1.125rem;
    line-height: 1.8rem;
    letter-spacing: normal;
    text-align: start;

    margin-bottom: 2rem;
}
.panel-tools {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 2rem;
}
</style>
