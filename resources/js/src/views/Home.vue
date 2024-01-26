<template>
    <Header>
        <template v-slot:userInfo >
            <UserInfo />
        </template>
    </Header>
    <TabNavigation/>
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
</style>
