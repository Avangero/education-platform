<template>
    <div class="tasks-templates">

        <TaskTemplateCard 
            v-for="card in tasksTemplates"
            :key="card.id"
            :task="card"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import TaskTemplateCard from './TaskTemplateCard.vue'

export default {
    name: "TaskTemplatesComponent",
    components: {TaskTemplateCard},
    data() {
        return {};
    },
    computed: {
        ...mapGetters({tasksTemplates: 'tasksTemplates/getList'})
    },
};
</script>

<style scoped lang="scss">
.tasks-templates {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 50px;
    margin-bottom: 50px;
}
</style>
