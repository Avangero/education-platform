<template>
    <div
        v-if="!getLoading"
        class="task-template">
        <Textarea
            v-model="templateTitle"
            autoResize
            class="task-template__title"/>
        <Editor
            v-model="templateContent"
            editorStyle="height: 320px"
            class="task-template__content"/>
    </div>
    <div
        v-else
        class="border-round border-1 surface-border p-4 surface-card loader">
        <div class="flex mb-3">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
                <Skeleton width="10rem" class="mb-2"></Skeleton>
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height=".5rem"></Skeleton>
            </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="flex justify-content-between mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Skeleton from 'primevue/skeleton';
import Textarea from 'primevue/textarea';
import Editor from 'primevue/editor';

export default {
    name: "TaskTemplate",
    components: {Skeleton, Textarea, Editor},
    data() {
        return {};
    },
    async created() {
        // await this.getTasksTemplates()
    },
    computed: {
        ...mapGetters({
            getTaskTemplateById: 'tasksTemplates/getListItemById',
            getLoading: 'tasksTemplates/getLoading'
        }),
        task() {
            return this.getTaskTemplateById(Number(this.taskId));
        },
        taskId() {
            return this.$route.params.id;
        },
        templateTitle: {
            get() {
                return this.task.title
            },
            set(value) {
                return this.$store.commit('tasksTemplates/CHANGE_TASK_TEMPLATE_TITLE', {
                    value: value,
                    taskTemplateId: this.taskId
                });
            }
        },
        templateContent: {
            get() {
                return this.task.content
            },
            set(value) {
                return this.$store.commit('tasksTemplates/CHANGE_TASK_TEMPLATE_CONTENT', {
                    value: value,
                    taskTemplateId: this.taskId
                });
            }
        },
    },
    methods: {
        ...mapActions({
            // getTasksTemplates: 'tasksTemplates/getTasksTemplates'
        }),
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.loader {
    width: 100%;
}

.card {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}

p {
    line-height: 1.75;
}


.task-template {
    padding: 50px 40px;
    width: 100%;

    &__title {
        color: $main-black;
        font-family: $font-manrop;
        width: 100%;
        margin-bottom: 20px;
    }

    &__content {
        margin: 10px 0;
    }
}

.content {
    color: $main-black;
    font-family: $font-manrop;
}

</style>
