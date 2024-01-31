<template>
    <div class="page-learning">
        <ProgressBar :progress-percent="progressPercent"></ProgressBar>
        <Tasks></Tasks>
    </div>
</template>
<script>
import {mapActions} from 'vuex';
import ProgressBar from "../components/ProgressBar.vue";
import Tasks from "../components/Tasks/Tasks.vue";

export default {
    name: "LearningComponent",
    components: {Tasks, ProgressBar},
    created() {
        this.getTasks();
    },
    data() {
        return {
            progressPercent: 17,
        };
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
    padding: 50px 40px;
    width: 100%;
}
</style>
