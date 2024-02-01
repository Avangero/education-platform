<template>
    <div class="task-container" v-click-outside="close">
        <i class="pi pi-times task-close" @click="close"></i>
        <div v-if="!getLoading" class="task">
            <div class="task-body">
                <TaskHeader :task="task" :mentorInfo="getCourseInfo.mentor"/>
                <div class="task-statuses">
                    <button class="task-status">Взять в работу</button>
                    <p class="task-created-date">Дедлайн: 30.01.2024</p>
                </div>
                <div class="task-content content">{{ task.content }}</div>
                <FileUpload
                    ref="fileUploadRef"
                    name="answer"
                    :customUpload="true"
                    :multiple="false"
                    :maxFileSize="1000000"
                    @uploader="onFileUpload"
                >
                    <template #empty>
                        <p>Перетащите файл.</p>
                    </template>
                </FileUpload>
            </div>
            <div class="chat">
                <TaskComments :comments="task.comments"/>
                <div class="comment-block">
                    <Textarea v-model="commentText" autoResize class="comment-input"/>
                    <Button @click="addComment">Отправить</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import TaskHeader from './TaskHeader.vue';
import TaskComments from './TaskComments.vue';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import FileUpload from "primevue/fileupload";


export default {
    name: "TaskComponent",
    components: {TaskHeader, TaskComments, FileUpload, Textarea, Button},
    data() {
        return {
            answerFile: null,
            commentText: '',
            isOpened: false,
            uploadedFileCount: 2
        };
    },
    async created() {
        await this.getTasks();
        this.isOpened = true;
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
        },
        async onFileUpload(event) {
            const fileUploadComponent = this.$refs.fileUploadRef;
            const file = await this.readFileAsync(event.files[0]);
            await this.submitAnswer({taskId: this.taskId, files: file});
            fileUploadComponent.uploadedFileCount++;
            fileUploadComponent.uploadedFiles.push(event.files[0]);
        },
        close() {
            if (this.isOpened) {
                this.$router.push({name: "tasks"})
            }
        },
        readFileAsync(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    resolve({
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        data: event.target.result
                    });
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsDataURL(file);
            });
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.task-container {
    position: fixed;
    top: 50px;
    left: 50px;
    right: 50px;
    bottom: 50px;
    z-index: 2;
}

.task-close {
    position: absolute;
    top: -25px;
    right: -25px;
    font-size: 1.5rem;
    cursor: pointer;
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
    padding: 20px 5px;
    display: flex;
    flex-direction: column;
}

.comment-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 10px;
}

.comment-input {
    font-size: 0.8rem;
    letter-spacing: 1px;
    padding: 10px;
    max-width: 100%;
    line-height: 1.5;
    border-radius: 5px;
    border: 1px solid $main-blue;
    width: 100%;
}
</style>
