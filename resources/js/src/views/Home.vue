<template>
    <Header>
        <template v-slot:userInfo >
            <UserInfo />
        </template>
    </Header>
    <div class="page-content-wrapper">
        <div class="page-content">
            <TabNavigation/>
            <router-view></router-view>
        </div>
        <Toolbar v-if="buttons.length">
            <template #end>
                <Button 
                    v-for="button in buttons"
                    :key="button.id"
                    :label="button.label"
                    class="mr-2"
                    :severity="button.severity"
                    @click="button.action({taskTemplateId: taskTemplateId})"/>
            </template>
        </Toolbar>
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import TabNavigation from "../components/Tabs/TabNavigation.vue";
import UserInfo from "../components/UserInfo.vue";
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { toolbar } from "../../utils/index.js";

export default {
    components: {
        TabNavigation,
        Header,
        UserInfo,
        Toolbar,
        Button
    },
    computed: {
        buttons() {
            return toolbar[this.$route.name]?.buttons ?? [];
        },
        taskTemplateId() {
            return this.$route.params.id
        }
    }
};
</script>

<style lang="scss">
@import "../styles/app.scss";

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
