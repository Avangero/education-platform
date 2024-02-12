<template>
    <div class="tasks">
        <div class="task-cards">
            <TaskListCard v-for="card in tasks" :key="card.id" :task="card" />
        </div>
    </div>
</template>

<script>
import TaskListCard from './TaskListCard.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Tasks',
    components: { TaskListCard },

    data() {
        return {};
    },
    computed: {
        ...mapGetters({ tasks: 'tasks/getTasks' })
    }
};
</script>

<style scoped lang="scss">
.tasks {
    flex: 1;
}

.task-cards {
    margin: 25px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
}
</style>
