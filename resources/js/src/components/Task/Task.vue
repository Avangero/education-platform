<template>
    <Toast/>
    <!-- <div class="task-container" v-click-outside="close"> -->
    <!-- при удаление вызывается обработчик который смотрит на не существующий элемент -->
    <div class="task-container">
        <i class="pi pi-times task-close" @click="close"></i>
        <div v-if="!getLoading" class="task">
            <div class="task-body">
                <TaskHeader :task="task" :mentorInfo="getCourseInfo.mentor"/>
                <div class="task-info">
                    <SplitButton
                        class="task-statuses"
                        :label="statusesButtons[0].label"
                        :model="statusesButtons"
                        :icon="statusesButtons[0].icon"
                        :severity="statusesButtons[0].severity">
                        <template #item="{item}">
                            <Button
                                :label="item.label"
                                :icon="item.icon"
                                :severity="item.severity"
                                text/>
                        </template>
                    </SplitButton>
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
                    :auto="true"
                    :showUploadButton="false"
                    :showCancelButton="false"
                    chooseLabel="Выбрать"
                >
                    <template #empty>
                        <p>Перетащите файл.</p>
                    </template>
                    <template #content="{ files, uploadedFiles, removeFileCallback }">
                        <div v-if="files.length > 0">
                            <h5>Pending</h5>
                            <div class="file-upload-content__group">
                                <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                                     class="file-upload-content__item">
                                    <div class="file-upload-content__left">
                                        <div class="file-upload-content__image">
                                            <img
                                                v-if="file.type.includes('image/')"
                                                role="presentation"
                                                :alt="file.name"
                                                :src="file.objectURL"
                                                width="50"/>
                                            <i v-else class="pi pi-file"></i>
                                        </div>
                                        <div class="file-upload-content__info">
                                            <span class="font-semibold">{{ file.name }}</span>
                                            <div>{{ formatSize(file.size) }}</div>
                                        </div>
                                    </div>
                                    <div class="file-upload-content__right">
                                        <Button icon="pi pi-times"
                                                @click="onRemoveTemplatingFile(file, removeFileCallback, index)" rounded
                                                text severity="danger"/>
                                        <Badge value="Pending" severity="warning"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="uploadedFiles.length > 0">
                            <h5>Completed</h5>
                            <div class="file-upload-content__group">
                                <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size"
                                     class="file-upload-content__item">
                                    <div class="file-upload-content__left">
                                        <div class="file-upload-content__image">
                                            <img
                                                v-if="file.type.includes('image/')"
                                                role="presentation"
                                                :alt="file.name"
                                                :src="file.objectURL"
                                                width="50"/>
                                            <i v-else class="pi pi-file"></i>
                                        </div>
                                        <div class="file-upload-content__info">
                                            <span class="font-semibold">{{ file.name }}</span>
                                            <div>{{ formatSize(file.size) }}</div>
                                        </div>
                                    </div>
                                    <div class="file-upload-content__right">
                                        <a :href="file.objectURL" download>
                                            <i class="pi pi-download"></i>
                                        </a>
                                        <Button icon="pi pi-times" @click="onRemoveUploadedFile(file, index)" rounded
                                                text severity="danger"/>
                                        <Badge value="Completed" severity="success"/>
                                    </div>
                                </div>
                            </div>
                        </div>
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
import Badge from 'primevue/badge';
import SplitButton from 'primevue/splitbutton';
import { buttons } from "../../../utils/index.js";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

export default {
    name: "TaskComponent",
    components: {TaskHeader, TaskComments, FileUpload, Textarea, Button, Badge, SplitButton, Toast},
    data() {
        return {
            answerFile: null,
            commentText: '',
            isOpened: false,
            toast: useToast()
        };
    },
    async created() {
        await this.getTasks();
        this.isOpened = true;
        this.addUploadedFiles();
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
        statusesButtons() {
            return buttons.map((button) => {
                return {
                    ...button,
                    command: () => {
                        console.log(this.taskId);
                        button.command(this.taskId)
                    }
                }
            })
        }
    },
    methods: {
        ...mapActions({
            submitAnswer: 'tasks/submitAnswer',
            removeAnswer: 'tasks/removeAnswer',
            submitComment: 'tasks/submitComment',
            getTasks: 'tasks/getTasks'
        }),
        async addComment() {
            if (this.commentText.trim() === '') return;
            await this.submitComment({taskId: this.taskId, commentText: this.commentText})
                .catch((error) => {
                    this.toast.add({
                        severity: "error",
                        summary: "Произошла ошибка",
                        detail: error.response.data.message,
                        life: 3000,
                    });
                });
            this.commentText = '';
        },
        async onFileUpload(event) {
            const fileUploadComponent = this.$refs.fileUploadRef;
            const file = await this.readFileAsync(event.files[0]);
            await this.submitAnswer({taskId: this.taskId, files: file}).then(() => {
                console.log('tes1')
            })
                .catch((error) => {
                console.log(3)
                this.toast.add({
                    severity: "error",
                    summary: "Произошла ошибка",
                    detail: error.response.data.message,
                    life: 3000,
                });
            });
            fileUploadComponent.uploadedFileCount++;
            fileUploadComponent.uploadedFiles.push(event.files[0]);
        },
        async onRemoveUploadedFile(file, fileIndex) {
            const fileName = file.name;
            await this.removeAnswer({taskId: this.taskId, fileName: fileName})
                .then(() => {
                    const fileUploadComponent = this.$refs.fileUploadRef;
                    fileUploadComponent.uploadedFileCount--;
                    fileUploadComponent.uploadedFiles.splice(fileIndex, 1);
                }).catch((error) => {
                    this.toast.add({
                        severity: "error",
                        summary: "Произошла ошибка",
                        detail: error.response.data.message,
                        life: 3000,
                    });
                });
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
        },
        addUploadedFiles() {
            const fileUploadComponent = this.$refs.fileUploadRef;
            this.task.answers.forEach(file => {
                const byteCharacters = atob(file.data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                const fileData = new File([byteArray], file.name, {type: this.getFileType(file.name)});
                const fileUrl = URL.createObjectURL(fileData);
                fileData.objectURL = fileUrl;

                fileUploadComponent.uploadedFileCount++;
                fileUploadComponent.uploadedFiles.push(fileData);
            });
        },

        getFileType(fileName) {
            const fileExtension = fileName.split('.').pop().toLowerCase();

            const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
            const documentExtensions = ['txt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

            if (imageExtensions.includes(fileExtension)) {
                return 'image/' + fileExtension;
            } else if (documentExtensions.includes(fileExtension)) {
                return 'application/' + fileExtension;
            } else {
                return 'application/octet-stream';
            }
        },

        onRemoveTemplatingFile(file, removeFileCallback, index) {
            removeFileCallback(index);
            this.totalSize -= parseInt(this.formatSize(file.size));
            this.totalSizePercent = this.totalSize / 10;
        },
        formatSize(bytes) {
            const k = 1024;
            const dm = 3;
            const sizes = this.$primevue.config.locale.fileSizeTypes;

            if (bytes === 0) {
                return `0 ${sizes[0]}`;
            }

            const i = Math.floor(Math.log(bytes) / Math.log(k));
            const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

            return `${formattedSize} ${sizes[i]}`;
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
    height: 100%;
    overflow-y: auto;
    padding-right: 40px;
    margin-right: 10px;
}

.task-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.task-statuses {

}

.task-status {
    width: 100%;
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
    width: 400px;
    height: 100%;
    border: 2px solid $main-blue-light;
    border-radius: 24px;
    padding: 20px 5px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
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

.file-upload-content {
    &__group {

    }

    &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__left {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__right {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__info {
        display: flex;
        flex-direction: column;
    }

    &__image {
        margin-right: 10px;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
