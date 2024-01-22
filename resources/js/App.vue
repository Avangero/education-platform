<template>
    <Header/>
    <TabNavigation/>
</template>

<script>
import Header from "./src/components/Header.vue";
import TabNavigation from "./src/components/Tabs/TabNavigation.vue";

export default {
    components: {
        TabNavigation,
        Header,
    },
};
</script>

<style lang="scss">
@import "./src/styles/app.scss";
</style>
