<template>
    <div>
        <div class="comments-header">
            <div class="header-left">
                <span class="comments-title">Комментарии</span>
                <span class="comments-count">{{ numberOfComments }}</span>
            </div>
            <button class="toggle-button" @click="toggleCollapse">
                <i
                    :class="
                        isCollapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up'
                    "
                ></i>
            </button>
        </div>
        <ul v-if="!isCollapsed" class="comments-list">
            <Comment
                v-for="(comment, index) in comments"
                :key="index"
                :commenter-id="comment.author"
                :commenter-name="
                    getAuthorFullName(comment.name, comment.surname)
                "
                :comment-date="comment.created_at"
                :comment-text="comment.content"
            />
        </ul>
        <CommentForm v-if="!isCollapsed" @submit-comment="submitComment" />
    </div>
</template>

<script>
import Comment from '@components/Tasks/Comments/Comment.vue';
import CommentForm from '@components/Tasks/Comments/CommentForm.vue';
import axios from 'axios';

export default {
    name: 'CommentList',
    components: { Comment, CommentForm },
    props: {
        comments: {
            type: Array,
            required: true
        },
        taskId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isCollapsed: false
        };
    },
    computed: {
        numberOfComments() {
            return this.comments.length;
        }
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        },
        getAuthorFullName(name, surname) {
            return `${name} ${surname}`;
        },
        async submitComment(content) {
            try {
                const response = await axios.post(
                    `/api/student/courses/tasks/${this.taskId}/comment`,
                    { content }
                );
                const newComment = response.data.content;

                const currentUser = this.$store.getters['auth/user'];

                const completeComment = {
                    ...newComment,
                    name: currentUser.name,
                    surname: currentUser.surname
                };

                this.comments.push(completeComment);
            } catch (error) {
                console.error(
                    'Ошибка отправки комментария:',
                    error.response?.data || error.message
                );
            }
        }
    }
};
</script>

<style scoped lang="scss">
@import '@styles/variables';

.comments-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;

    .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .comments-title {
        font-size: 1.25rem;
        color: $text-main;
    }

    .comments-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border: 1px solid var(--surface-border);
        border-radius: 0.5rem;
    }

    .toggle-button {
        background: none;
        border: none;
        cursor: pointer;
        color: $text-main;
        font-size: 1.25rem;
        display: flex;
        align-items: center;

        i {
            font-size: 1.25rem;
        }
    }
}

.comments-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
