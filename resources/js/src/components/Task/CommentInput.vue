<template>
    <div class="comment-block">
        <Textarea v-model="commentText" autoResize class="comment-input"/>
        <Button @click="$emit('submit')">Отправить</Button>
    </div>
</template>

<script>
import Textarea from "primevue/textarea";
import Button from "primevue/button";

export default {
    components: {Textarea, Button},
    data() {
        return {
            commentText: ''
        };
    }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

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
