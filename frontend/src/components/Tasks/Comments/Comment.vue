<template>
    <li class="comment-item">
        <EPAvatar :id="commenterId" :name="commenterName" />
        <div class="comment-content">
            <span class="comment-author">{{ commenterName }}</span>
            <p class="comment-date">{{ getDate(commentDate) }}</p>
            <p class="comment-text">{{ commentText }}</p>
        </div>
    </li>
</template>

<script>
import EPAvatar from '@components/EP/EPAvatar.vue';

export default {
    name: 'Comment',
    components: { EPAvatar },
    props: {
        commenterId: {
            type: Number,
            required: true
        },
        commenterName: {
            type: String,
            required: true
        },
        commentDate: {
            type: String,
            required: true
        },
        commentText: {
            type: String,
            required: true
        }
    },
    methods: {
        getDate(dateString) {
            const date = new Date(dateString);
            const month = date.getMonth();
            const months = {
                0: 'января',
                1: 'февраля',
                2: 'марта',
                3: 'апреля',
                4: 'мая',
                5: 'июня',
                6: 'июля',
                7: 'августа',
                8: 'сентября',
                9: 'октября',
                10: 'ноября',
                11: 'декабря'
            };
            return `${date.getDate()} ${months[month]} ${date.getHours()}:${date.getMinutes()}`;
        }
    }
};
</script>

<style scoped lang="scss">
@import '@styles/variables';

.comment-item {
    display: flex;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid var(--surface-border);
    border-radius: 0.5rem;
}

.comment-content {
    margin-left: 1rem;

    .comment-author {
        font-weight: 600;
        color: $text-main;
        display: block;
    }

    .comment-date {
        font-weight: 600;
        color: var(--text-600);
        margin: 0;
        font-size: 0.875rem;
    }

    .comment-text {
        line-height: 1.5;
        margin-top: 1rem;
        margin-bottom: 0;
    }
}
</style>
