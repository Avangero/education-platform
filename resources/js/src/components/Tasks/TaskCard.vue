<template>
    <div class="task-card" @click="handleClick">
        <div class="card-content">
            <h3 class="card-title">{{ data.title }}</h3>
            <p class="card-description">{{ data.content }}</p>
            <div class="additional-info">
                <div class="status">
                    <div class="status-bg" :style="{ background: statusBgColor }">
                        <span class="status-text" :style="{ color: statusTextColor }">{{ data.status }}</span>
                    </div>
                </div>
                <div class="info-container">
                    <div class="comments">
                        <div class="counter-text">{{ data.commentsCount }}</div>
                        <img :src="CommentSvg" alt="Comment Icon"/>
                    </div>
                    <div class="files">
                        <div class="counter-text">{{ data.filesCount }}</div>
                        <img :src="FolderSvg" alt="File Icon"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommentSvg from "../../images/task-icons/comment.svg";
import FolderSvg from "../../images/task-icons/folder.svg";

export default {
    props: {
        data: {
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
            switch (this.data.status) {
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
            switch (this.data.status) {
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
    },
    methods: {
        handleClick() {
        },
    },
};
</script>

<style scoped lang="scss">
@import '../../styles/variables';

.task-card {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: calc(50% - 65px);;
    height: 265px;
    transition: box-shadow 0.3s ease;
    cursor: pointer;
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
    font-family: 'Manrope', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
}

.card-description {
    color: $text-grey;
    font-family: 'Manrope', sans-serif;
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
    font-family: 'Manrope', sans-serif;
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
    filter: invert(33%) sepia(62%) saturate(3901%) hue-rotate(207deg) brightness(97%) contrast(96%);
}

.counter-text {
    color: $main-blue;
    font-family: 'Manrope', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
</style>
