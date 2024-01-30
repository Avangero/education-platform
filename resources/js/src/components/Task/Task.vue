<template>
    <div 
        v-if="!getLoading"
        class="task">
        <h1 class="task__title">{{ task.title }}</h1>
        <div class="task__mentor mentor">
            <div class="mentor__photo photo">
                <div class="text">{{ getCourseInfo.mentor.name?.charAt(0) }}</div>
            </div>
            <div class="mentor__name name">{{getCourseInfo.mentor.name + ' ' + getCourseInfo.mentor.surname}}</div>

        </div>
        <div class="task__content content">{{ task.content }}</div>
        <Toast/>
        <div class="task__answer">
            <FileUpload 
                name="answer"
                :customUpload="true"
                @uploader="onAnswerUpload($event)"
                @error="onError($event)"
                :multiple="true"
                accept="image/*"
                :maxFileSize="1000000">
                    <template #empty>
                    <p>Перетащите файл.</p>
                </template>
            </FileUpload>
        </div>

        <div class="task__comments-block comments-block">
            <div class="comments-block__comment" v-for="(comment, index) in task.comments" :key="comment.id">
                {{ comment.created_at }}: {{ comment.content }}
            </div>
        </div>
        <div class="task__comment-block comment-block">
            <Textarea 
                v-model="commentText" 
                autoResize
                class="comment-block__comment" />
            <Button @click="() => submitComment({taskId, commentText})">Отправить</Button>
        </div>
    </div>
    <div 
        v-else
        class="border-round border-1 surface-border p-4 surface-card loader">
        <div class="flex mb-3">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
                <Skeleton width="10rem" class="mb-2"></Skeleton>
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height=".5rem"></Skeleton>
            </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="flex justify-content-between mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Toast from 'primevue/toast';
import FileUpload from 'primevue/fileupload';
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Skeleton from 'primevue/skeleton';

export default {
    name: "TaskComponent",
    components: {Toast, FileUpload, Textarea, Button, Skeleton},
    data() {
        return {
            answerFile: null,
            commentText: ''
        };
    },
    async created() {
        await this.getTasks()
    },
    computed: {
        ...mapGetters({
            getTaskById: 'tasks/getTaskById',
            getCourseInfo: 'tasks/getCourseInfo',
            getLoading: 'tasks/getLoading'
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
            submitComment: 'tasks/submitComment',
            getTasks: 'tasks/getTasks'
        }),
        onAnswerUpload(files) {
            this.submitAnswer({taskId: this.taskId, files: files});
        },
        onUpload() {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        },
        onError() {
            this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
        }
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.loader{
    width: 100%;
    .card {
        background: var(--surface-card);
        padding: 2rem;
        border-radius: 10px;
        margin-bottom: 1rem;
    }

    p {
        line-height: 1.75;
    }
}
.task {
    padding: 50px 40px;

    &__title {
        color: $main-black;
        font-family: $font-manrop;
        margin-top: 0;
    }

    &__mentor {
        margin: 10px 0;
    }

    .mentor {
        display: flex;
        align-items: center;

        &__photo {
            margin: 0 10px;
        }

        .photo {
            width: 40px;
            height: 40px;
            overflow: hidden;
            border-radius: $main-avatar-border-radius;
            display: flex;
            align-items: center;
            justify-content: center;
            background: $main-blue-light;

            .text {
                font-family: $font-manrop;
                font-weight: 800;
                color: white;
                font-size: 18px;
            }
        }

        &__name {
            margin: 0 10px;
        }

        .name {
            font-family: $font-manrop;
            font-weight: 800;
            color: black;
            font-size: 16px;
        }
    }

    &__content {
        margin: 10px 0;
    }

    .content {
        color: $main-black;
        font-family: $font-manrop;
    }

    &__answer {
        margin: 20px 0;
    }

    &__comments-block {
        width: 100%;
        margin: 20px 0;
    }

    .comments-block {
        color: $main-black;
        font-family: $font-manrop;
        border: 1px dashed $main-blue;
        border-radius: 20px;
        padding: 20px;
    }

    &__comment-block {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        gap: 10px;
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
            flex-grow: 1;
            width: 100%;
        }
    }
}
</style>
