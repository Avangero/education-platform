<template>
    <RouterLink :to="taskTemplateLink" class="task-template-card">
        <div class="card-content">
            <h3 class="card-title">{{ task.title }}</h3>
            <div class="card-description" v-html="task.content"></div>
        </div>
    </RouterLink>
</template>

<script>
export default {
    name: 'TaskTemplateCard',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    computed: {
        taskTemplateLink() {
            return `/tasks-templates/${this.task.id}`;
        }
    }
};
</script>

<style scoped lang="scss">
@import '@styles/variables';

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
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.card-title {
    margin-bottom: 10px;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
}

.card-description {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.3px;
    max-height: 200px;
    overflow: hidden;
}
</style>
