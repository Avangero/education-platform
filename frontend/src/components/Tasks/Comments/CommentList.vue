<template>
    <div class="flex align-items-center font-bold">
        <span class="text-xl text-900 mr-4">Комментарии</span>
        <span
            class="inline-flex align-items-center justify-content-center w-2rem h-2rem border-1 surface-border border-round"
            >{{ numberOfComments }}</span
        >
    </div>
    <ul class="list-none p-0 m-0">
        <Comment
            v-for="(comment, index) in comments"
            :key="index"
            :commenter-id="comment.author"
            :commenter-name="getAuthorFullName(comment.name, comment.surname)"
            :comment-date="comment.created_at"
            :comment-text="comment.content"
        />
    </ul>
</template>

<script>
import Comment from '@components/Tasks/Comments/Comment.vue';

export default {
    name: 'CommentList',
    components: { Comment },
    props: {
        comments: {
            type: Object,
            required: true
        }
    },
    computed: {
        numberOfComments() {
            return this.comments.length;
        }
    },
    methods: {
        getAuthorFullName(name, surname) {
            return `${name} ${surname}`;
        }
    }
};
</script>

<style scoped lang="scss"></style>
