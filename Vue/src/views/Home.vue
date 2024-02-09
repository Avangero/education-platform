<template>
    <div :class="['app', {'app--sidebar-margin': isShowNavbar}]">
        <Header>
            <template v-slot:userInfo >
                <UserInfo />
            </template>
        </Header>
        <div class="page-content-wrapper">
            <div class="page-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import UserInfo from "../components/UserInfo.vue";
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import {mapGetters} from 'vuex';

export default {
    components: {
        Header,
        UserInfo,
        Toolbar,
        Button
    },
    computed: {
        ...mapGetters({
            isShowNavbar: 'navbar/isShow'
        }),
        taskTemplateId() {
            return this.$route.params.id
        }
    }
};
</script>

<style lang="scss">
@import "../styles/app.scss";

.app {
    transition: margin-left 0.3s;
    margin-left: 0px;
    &--sidebar-margin {
        margin-left: 320px;
    }
}

.page-content-wrapper {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 100px);
}

.page-content {
    display: flex;
    margin-bottom: auto;
    flex-grow: 1;
}
</style>
