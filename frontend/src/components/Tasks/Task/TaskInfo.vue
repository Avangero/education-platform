<template>
    <div class="task-info">
        <SplitButton
            class="task-statuses"
            :label="currentStatusButton.label"
            :model="statusesButtons"
            :severity="currentStatusButton.severity"
            rounded
        >
        </SplitButton>
    </div>
</template>

<script>
import Button from 'primevue/button';
import SplitButton from 'primevue/splitbutton';
import { buttons } from '../../../../utils/index.js';

export default {
    name: 'TaskInfo',
    components: { Button, SplitButton },
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    computed: {
        statusesButtons() {
            return buttons.map((button) => {
                return {
                    ...button,
                    command: () => {
                        button.command(this.task.id);
                    }
                };
            });
        },
        currentStatusButton() {
            const taskStatus = this.task.status;
            if (taskStatus) {
                return buttons.find(
                    (button) => button.label === this.task.status
                );
            } else {
                buttons[0];
            }
        }
    }
};
</script>
