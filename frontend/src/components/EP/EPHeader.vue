<template>
    <div class="header">
        <EPBreadCrumb />
        <UserInfo />
    </div>
</template>

<script>
import EPBreadCrumb from './EPBreadCrumb.vue';
import { mapGetters } from 'vuex';
import UserInfo from '../Tasks/Task/UserInfo.vue';

export default {
    name: 'EPHeader',
    components: {
        UserInfo,
        EPBreadCrumb
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    }
};
</script>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}
</style>
