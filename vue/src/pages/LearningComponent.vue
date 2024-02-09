<template>
    <div class="page-learning">
        <EPProgressBar :progress-percent="progressPercent"></EPProgressBar>
        <Tasks></Tasks>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import EPProgressBar from "../components/EPProgressBar.vue";
import Tasks from "../components/Tasks/Tasks.vue";

export default {
    name: "LearningComponent",
    components: {Tasks, EPProgressBar},
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
            this.tasks?.forEach(task => {
                if (task.status === 'Выполнено') numberOfCompletedTasks++;
            });
            const progressPercent = Math.round(numberOfCompletedTasks / this.tasks?.length * 100);
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
    padding: 10px 40px 50px 40px;
    width: 100%;
}
</style>
