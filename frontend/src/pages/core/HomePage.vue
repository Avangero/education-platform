<template>
    <div :class="['app', { 'app--sidebar-margin': isShowNavbar }]">
        <EPSidebar />
        <div class="page-content-wrapper">
            <EPHeader />
            <div class="page-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import EPHeader from '@components/EP/EPHeader.vue';
import { mapActions, mapGetters } from 'vuex';
import EPBreadCrumb from '@components/EP/EPBreadCrumb.vue';
import EPSidebar from '@components/EP/EPSidebar.vue';

export default {
    components: {
        EPSidebar,
        EPBreadCrumb,
        EPHeader
    },
    computed: {
        ...mapGetters({
            isShowNavbar: 'navbar/isShow'
        }),
        taskTemplateId() {
            return this.$route.params.id;
        }
    },
    methods: {
        ...mapActions({
            getUser: 'auth/getUser'
        })
    },

    created() {
        this.getUser();
    }
};
</script>

<style lang="scss">
@import '@styles/app';

.app {
    transition: margin-left 0.3s;
    margin-left: 0;

    &--sidebar-margin {
        margin-left: 15rem;
    }
}

.page-content-wrapper {
    width: 100%;
    padding: 2rem;
    margin-left: auto !important;
    margin-right: auto !important;
}

.page-content {
    display: flex;
    flex-grow: 1;
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    margin-bottom: 1rem;
    box-shadow: var(--card-shadow);
    border-radius: 1rem;
}
</style>
