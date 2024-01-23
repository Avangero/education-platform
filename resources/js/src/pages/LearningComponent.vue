<template>
    <ProgressBar :progress-percent="progressPercent"></ProgressBar>
    <Tasks></Tasks>
</template>
<script>
import ProgressBar from "../components/ProgressBar.vue";
import Tasks from "../components/Tasks/Tasks.vue";

export default {
    name: "LearningComponent",
    components: {Tasks, ProgressBar},
    data() {
        return {
            progressPercent: 17,
        };
    },
};
</script>

<style scoped lang="scss">
</style>
