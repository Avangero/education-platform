<template>
    <div class="comment-form">
        <Textarea
            v-model="commentText"
            rows="4"
            placeholder="Напишите ваш комментарий..."
            autoResize
            class="comment-input"
        />
        <Button
            label="Отправить"
            :disabled="!commentText.trim()"
            class="submit-button"
            @click="handleSubmit"
        />
    </div>
</template>

<script>
export default {
    name: 'CommentForm',
    data() {
        return {
            commentText: ''
        };
    },
    methods: {
        handleSubmit() {
            if (this.commentText.trim()) {
                this.$emit('submit-comment', this.commentText.trim());
                this.commentText = '';
            }
        }
    }
};
</script>

<style scoped lang="scss">
@import '@styles/variables';

.comment-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    .comment-input {
        width: 100%;
        font-size: 1rem;
    }

    .submit-button {
        align-self: flex-end;
        font-size: 1rem;
    }
}
</style>
