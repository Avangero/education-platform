<template>
    <div class="task-comments-block comments-block">
        <div v-for="(comment, index) in comments" :key="comment.id" class="comment">{{ comment.content }}</div>
    </div>
</template>

<script>
export default {
    props: {
        comments: Array
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.task-comments-block {
    width: 100%;
}

.comments-block {
    color: $main-black;
    font-family: $font-manrop;
    height: 80%;
    overflow: auto;
}

.comment {
    position: relative;
    width: 100%;
    background: $main-blue-light;
    border-radius: 16px;
    margin-bottom: 20px;
    padding: 20px;
    font-weight: 200;
    font-size: 14px;
}


</style>
