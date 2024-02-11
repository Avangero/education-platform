<template>
    <div class="page-learning">
        <EPProgressBar :progress-percent="progressPercent"></EPProgressBar>
        <TaskList></TaskList>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import EPProgressBar from '../components/EPProgressBar.vue';
import TaskList from '../components/TaskList/TaskList.vue';

export default {
    name: 'LearningComponent',
    components: { TaskList, EPProgressBar },
    created() {
        this.getTasks();
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            tasks: 'tasks/getTasks'
        }),
        progressPercent() {
            if (!this.tasks) return 0;
            let numberOfCompletedTasks = 0;
            this.tasks?.forEach((task) => {
                if (task.status === 'Выполнено') numberOfCompletedTasks++;
            });
            const progressPercent = Math.round(
                (numberOfCompletedTasks / this.tasks?.length) * 100
            );
            return progressPercent;
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
.page-learning {
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem 2rem 3rem;
    width: 100%;
}
</style>
