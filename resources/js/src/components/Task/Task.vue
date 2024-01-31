<template>
    <div class="task-container">
        <div v-if="!getLoading" class="task">
            <div class="task-body">
                <TaskHeader :task="task" :mentorInfo="getCourseInfo.mentor"/>
                <div class="task-statuses">
                    <button class="task-status">Взять в работу</button>
                    <p class="task-created-date">Дедлайн: 30.01.2024</p>
                </div>
                <div class="task-content content">{{ task.content }}</div>
                <FileUploadComponent @upload="onAnswerUpload" @error="onError"/>
            </div>
            <div class="chat">
                <TaskComments :comments="task.comments"/>
                <CommentInput @submit="addComment" v-model="commentText"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import TaskHeader from './TaskHeader.vue';
import TaskComments from './TaskComments.vue';
import FileUploadComponent from './FileUploadComponent.vue';
import CommentInput from './CommentInput.vue';

export default {
    name: "TaskComponent",
    components: {TaskHeader, TaskComments, FileUploadComponent, CommentInput},
    data() {
        return {
            answerFile: null,
            commentText: ''
        };
    },
    async created() {
        await this.getTasks();
    },
    computed: {
        ...mapGetters({
            getTaskById: 'tasks/getTaskById',
            getCourseInfo: 'tasks/getCourseInfo',
            getLoading: 'tasks/getLoading',
            getUser: 'auth/user'
        }),
        task() {
            return this.getTaskById(Number(this.taskId));
        },
        taskId() {
            return this.$route.params.id;
        },
    },
    methods: {
        ...mapActions({
            submitAnswer: 'tasks/submitAnswer',
            submitComment: 'tasks/submitComment',
            getTasks: 'tasks/getTasks'
        }),
        async addComment() {
            if (this.commentText.trim() === '') return;
            await this.submitComment({taskId: this.taskId, commentText: this.commentText});
            this.commentText = '';
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";
.task-container {
    padding: 50px;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
}

.task-status {
    padding: 10px;
    background: $main-blue;
    border-radius: 16px;
    text-align: center;
    border: none;
    color: white;
    cursor: pointer;
    font-family: $font-manrop;
    font-size: 14px;
}
.task {
    padding: 40px;
    border-radius: 50px;
    background: white;
    height: 100%;
    box-shadow: -20px 20px 100px #666666,
    20px -20px 100px #ffffff;
    display: flex;
    justify-content: space-between;
}

.task-body {
    width: 70%;
    height: 100%;
}

.task-statuses {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.content {
    margin-top: 25px;
    height: 40%;
    border: 2px solid $main-blue-light;
    border-radius: 24px;
    padding: 20px;
    margin-bottom: 25px;
    color: $text-grey;
    font-family: $font-manrop;
    font-size: 20px;
}

.chat {
    width: 25%;
    height: 100%;
    border: 2px solid $main-blue-light;
    border-radius: 24px;
    padding: 20px;
}
</style>
