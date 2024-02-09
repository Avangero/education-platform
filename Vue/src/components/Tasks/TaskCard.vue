<template>
    <RouterLink
        :to="taskLink"
        class="task-card">
        <div class="card-content">
            <h3 class="card-title">{{ task.title }}</h3>
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
        </div>
    </RouterLink>
</template>

<script>
import CommentSvg from "../../images/task-icons/comment.svg";
import FolderSvg from "../../images/task-icons/folder.svg";

export default {
    name: "TaskCard",
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

.task-card {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: calc(50% - 25px);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    text-decoration: none;
}

.task-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.card-title {
    margin-bottom: 10px;
    color: $main-black;
    font-family: $font-manrop;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
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
