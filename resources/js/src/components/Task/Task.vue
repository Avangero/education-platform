<template>
    <div class="task">
        <h1 class="task__title">Hi</h1>
        <div class="task__info">Some Info</div>
        <form class="task__answer-block">
            <input type="file">
            <button @submit="Submit">Отправить</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "TaskComponent",
    data() {
        return {};
    },
    computed: {
    }
};
</script>

<style scoped lang="scss">
</style>
