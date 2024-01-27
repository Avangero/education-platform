<template>
    <Header>
        <template v-slot:userInfo >
            <UserInfo />
        </template>
    </Header>
    <div class="page-content">
        <TabNavigation/>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import TabNavigation from "../components/Tabs/TabNavigation.vue";
import UserInfo from "../components/UserInfo.vue";

export default {
    components: {
        TabNavigation,
        Header,
        UserInfo
    },
};
</script>

<style lang="scss">
@import "../styles/app.scss";

.page-content {
    display: flex;
}
</style>
