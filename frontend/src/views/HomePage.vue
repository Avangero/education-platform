<template>
    <div :class="['app', { 'app--sidebar-margin': isShowNavbar }]">
        <EppSidebar />
        <div class="page-content-wrapper">
            <EPPHeader />
            <div class="page-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import EPPHeader from '../components/EPPHeader.vue';
import { mapActions, mapGetters } from 'vuex';
import EPPBreadCrumb from '../components/EPPBreadCrumb.vue';
import EppSidebar from '../components/EppSidebar.vue';

export default {
    components: {
        EppSidebar,
        EPPBreadCrumb,
        EPPHeader
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
@import '../styles/app.scss';

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
