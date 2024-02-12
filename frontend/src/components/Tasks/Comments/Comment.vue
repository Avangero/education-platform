<template>
    <li class="flex p-3 mb-3 border-1 surface-border border-round">
        <EPAvatar :id="commenterId" :name="commenterName" />
        <div>
            <span class="font-semibold text-900">{{ commenterName }}</span>
            <p class="font-semibold text-600 m-0 text-sm">
                {{ getDate(commentDate) }}
            </p>
            <p class="line-height-3 mb-0 my-3">{{ commentText }}</p>
        </div>
    </li>
</template>

<script>
import EPAvatar from '../../EP/EPAvatar.vue';

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
