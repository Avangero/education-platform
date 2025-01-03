<template>
    <Avatar
        v-if="fileExists"
        :image="getPath"
        class="mr-2 w-3rem h-3rem mr-3 flex-shrink-0"
        size="large"
        shape="circle"
    />
    <Avatar
        v-else
        :label="getLabel"
        class="mr-2"
        size="large"
        style="background-color: var(--primary-color); color: white"
        shape="circle"
    />
</template>

<script>
import Avatar from 'primevue/avatar';

export default {
    name: 'EPAvatar',
    components: { Avatar },
    props: {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            fileExists: false
        };
    },
    mounted() {
        this.checkFileExists();
    },
    updated() {
        this.checkFileExists();
    },
    methods: {
        checkFileExists() {
            const img = new Image();
            img.src = this.getPath;
            img.onload = () => {
                this.fileExists = true;
            };
            img.onerror = () => {
                this.fileExists = false;
            };
        }
    },
    computed: {
        getLabel() {
            return this.name?.charAt(0);
        },
        getPath() {
            return `/storage/avatars/${this.id}/img.png`;
        }
    }
};
</script>
