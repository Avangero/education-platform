<template>
    <div class="task">
        <h1 class="task__title">{{ task.title }}</h1>
        <div class="task__content">{{ task.content }}</div>
        <form 
            class="task__answer-block"
            @submit.prevent="() => submitAnswer({taskId, answerFile})"
            action="">
            <input
                id="anwer"
                type="file"
                name="anwer"
                @change="onFileChange">
            <button @submit="Submit">Отправить</button>
        </form>
        <div class="task__comments-block comments-block">
            <div class="comments-block__comment" v-for="(comment, index) in task.comments" :key="comment.id">
                {{ index }}: {{ comment.text }}
            </div>
        </div>
        <form 
            class="task__comment-block comment-block"
            @submit.prevent="() => submitComment({taskId, commentText})"
            action=""
            >
            <input
                class="comment-block__comment"
                id="comment"
                type="textarea"
                name="comment"
                rows="5"
                cols="33"
                v-model="commentText">
            <button @submit="Submit">Отправить</button>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: "TaskComponent",
    data() {
        return {
            answerFile: null,
            commentText: ''
        };
    },
    computed: {
        ...mapGetters({
            getTaskById: 'tasks/getTaskById'
        }),
        task () {
            return this.getTaskById(Number(this.taskId));
        },
        taskId () {
            return this.$route.params.id;
        },
    },
    methods: {
        ...mapActions({
            submitAnswer: 'tasks/submitAnswer',
            submitComment: 'tasks/submitComment'
        }),
        onFileChange(e) {
            const formData = new FormData();
            const files = e.target.files || e.dataTransfer.files;

            if (!files.length) return;

            formData.append('file', files[0], files[0].name)
            this.answerFile = formData;
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.task {
    padding: 50px 40px;

    &__title {
        color: $main-black;
        font-family: $font-manrop;
        margin-top: 0;
    }
    &__content {
        color: $main-black;
        font-family: $font-manrop;
        margin: 10px 0;
    }
    &__comment-block {
        width: 100%;
    }
    .comment-block {
        &__comment {
            font-size: 0.8rem;
            letter-spacing: 1px;
            padding: 10px;
            max-width: 100%;
            line-height: 1.5;
            border-radius: 5px;
            border: 1px solid #ccc;
            box-shadow: 1px 1px 1px #999;
        }
    }
}
</style>
