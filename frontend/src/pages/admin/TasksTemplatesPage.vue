<template>
    <div class="tasks-templates-page">
        <TasksTemplates />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import TasksTemplates from '../../components/Tasks/admin/TasksTemplates/TasksTemplates.vue';

export default {
    name: 'TasksTemplatesPage',
    components: { TasksTemplates },
    created() {
        // this.getTasksTemplates();
    },
    data() {
        return {};
    },
    methods: {
        ...mapActions({
            getTasksTemplates: 'tasksTemplates/getTasksTemplates'
        })
    }
};
</script>

<style scoped lang="scss">
.tasks-templates-page {
    display: flex;
    flex-direction: column;
    padding: 50px 40px;
    width: 100%;
}
</style>
