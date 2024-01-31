<template>
    <div class="tasks">
        <div class="task-cards">
            <TaskCard
                v-for="card in tasks"
                :key="card.id"
                :task="card"/>
        </div>
    </div>
</template>

<script>
import TaskCard from "./TaskCard.vue";
import {mapGetters} from 'vuex';

export default {
    name: "Tasks",
    components: {TaskCard},

    data() {
        return {};
    },
    computed: {
        ...mapGetters({tasks: 'tasks/getTasks'}),
    }
};
</script>

<style scoped lang="scss">
.tasks {
    flex: 1;
}

.task-cards {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    margin-bottom: 50px;
}
</style>
