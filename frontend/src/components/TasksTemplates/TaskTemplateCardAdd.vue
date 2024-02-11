<template>
    <div @click="createTaskTemplate" class="task-template-card">
        <div class="card-content">
            <i class="pi pi-plus card-icon"></i>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'TaskTemplateCardAdd',
    data() {},
    computed: {},
    methods: {
        ...mapActions({
            createTaskTemplate: 'tasksTemplates/createTaskTemplate'
        })
    }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables';

.task-template-card {
    display: flex;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: calc(50% - 25px);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    min-height: 200px;
}

.task-template-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.card-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

.card-icon {
    font-size: 36px;
}
</style>
