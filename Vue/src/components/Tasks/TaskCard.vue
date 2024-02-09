<template>
    <RouterLink
        :to="taskLink"
        class="task-link">
        <Card class="task-card" style="overflow: hidden">
            <template #title>
                {{ task.title }}
            </template>
            <template #content>
                <p class="card-description">{{ task.content }}</p>
                <div class="additional-info">
                    <div class="status">
                        <div class="status-bg" :style="{ background: statusBgColor }">
                            <span class="status-text" :style="{ color: statusTextColor }">{{ task.status }}</span>
                        </div>
                    </div>
                    <div class="info-container">
                        <div class="comments">
                            <div class="counter-text">{{ task.comments.length }}</div>
                            <img :src="CommentSvg" alt="Comment Icon"/>
                        </div>
                        <div class="files">
                            <div class="counter-text">{{ task.answers.length }}</div>
                            <img :src="FolderSvg" alt="File Icon"/>
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </RouterLink>
</template>

<script>
import CommentSvg from "../../images/task-icons/comment.svg";
import FolderSvg from "../../images/task-icons/folder.svg";
import Card from 'primevue/card';

export default {
    name: "TaskCard",
    components: {
        Card
    },
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            CommentSvg: CommentSvg,
            FolderSvg: FolderSvg,
        };
    },
    computed: {
        statusTextColor() {
            switch (this.task.status) {
                case "Выполнено":
                    return "#74DF9F";
                case "В работе":
                    return "#176EF2";
                case "На проверке":
                    return "#5A5280";
                case "Не начато":
                    return "#D8727D";
            }
        },
        statusBgColor() {
            switch (this.task.status) {
                case "Выполнено":
                    return "#E3F9EC";
                case "В работе":
                    return "#D1E2FC";
                case "На проверке":
                    return "#DEDCE6";
                case "Не начато":
                    return "#F7E3E5";
            }
        },
        taskLink() {
            return `/tasks/${this.task.id}`
        }
    },
    methods: {},
};
</script>

<style scoped lang="scss">
@import '../../styles/variables';

.task-link {
    width: calc(50% - 25px);
    cursor: pointer;
    text-decoration: none;
}

.task-card {
    height: 100%;
    border: 1px solid #dfe7ef;
    box-shadow: 0px 4px 30px rgba(221, 224, 255, .54);
    border-radius: 12px;
}


.card-description {
    color: $text-grey;
    font-family: $font-manrop;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.3px;
}

.additional-info {
    display: flex;
    align-items: center;
    margin-top: auto;
}

.status {
    flex: 1;
}

.status-bg {
    width: 90px;
    height: 24px;
    border-radius: 6px;
    text-align: center;
}

.status-text {
    font-family: $font-manrop;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 2;
}

.info-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.files,
.comments {
    display: flex;
    align-items: center;
    gap: 5px;

    img {
        filter: invert(33%) sepia(62%) saturate(3901%) hue-rotate(207deg) brightness(97%) contrast(96%);
    }
}

.counter-text {
    color: $main-blue;
    font-family: $font-manrop;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
</style>

<style>
.p-card-content {
    padding: 0;
}
</style>
