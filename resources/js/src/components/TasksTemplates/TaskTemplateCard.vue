<template>
    <RouterLink
        :to="taskTemplateLink"
        class="task-template-card">
        <div class="card-content">
            <h3 class="card-title">{{ task.title }}</h3>
            <p class="card-description">{{ task.content }}</p>
        </div>
    </RouterLink>
</template>

<script>
import CommentSvg from "../../images/task-icons/comment.svg";
import FolderSvg from "../../images/task-icons/folder.svg";

export default {
    name: "TaskTemplateCard",
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
        taskTemplateLink() {
            return `/tasks-templates/${this.task.id}`
        }
    },
};
</script>

<style scoped lang="scss">
@import '../../styles/variables';

.task-template-card {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: calc(50% - 25px);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    text-decoration: none;
}

.task-template-card:hover {
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
</style>
