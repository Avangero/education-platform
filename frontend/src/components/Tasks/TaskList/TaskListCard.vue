<template>
    <RouterLink :to="taskLink" class="task-link">
        <Card class="task-card" style="overflow: hidden">
            <template #title>
                {{ task.title }}
            </template>
            <template #content>
                <p class="card-description">{{ task.content }}</p>
            </template>
            <template #footer>
                <div class="flex gap-3 mt-1">
                    <div class="status">
                        <Button
                            class="status-btn"
                            :label="task.status"
                            outlined
                            :severity="severity"
                        />
                    </div>
                    <div class="comments">
                        <div class="counter-text">
                            {{ task.comments.length }}
                        </div>
                        <i class="pi pi-comment"></i>
                    </div>
                    <div class="files">
                        <div class="counter-text">
                            {{ task.answers.length }}
                        </div>
                        <i class="pi pi-folder"></i>
                    </div>
                </div>
            </template>
        </Card>
    </RouterLink>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';

export default {
    name: 'TaskCard',
    components: {
        Card,
        Button
    },
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            severity: ''
        };
    },
    created() {
        const statusSeverityMap = {
            Выполнено: 'success',
            'В работе': 'info',
            'На проверке': 'secondary'
        };
        this.severity = statusSeverityMap[this.task.status] || 'danger';
    },
    computed: {
        taskLink() {
            return `/tasks/${this.task.id}`;
        }
    },
    methods: {}
};
</script>

<style lang="scss">
@import '../../../styles/variables';

.task-link {
    width: calc(50% - 25px);
    cursor: pointer;
    text-decoration: none;
}

.task-card {
    border-radius: var(--border-radius);
    height: 100%;
    box-shadow: 0 4px 1rem var(--gray-200);

    &:hover {
        box-shadow: 0 4px 2rem var(--primary-100);
        border-width: 0.1px;
    }
}

.card-description {
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2rem;
    letter-spacing: 0.3px;
}

.status {
    flex: 1;
}

.status-btn {
    height: 24px;
    border-radius: 6px;
    text-align: center;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2;
}

.files,
.comments {
    display: flex;
    align-items: center;
    gap: 5px;
}

.counter-text {
    color: $main;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.p-card {
    padding: 1.25rem;
    height: 100%;
}

.p-card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.p-card-footer {
    margin-top: auto;
}
</style>
