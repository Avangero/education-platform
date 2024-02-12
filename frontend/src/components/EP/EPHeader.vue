<template>
    <div class="header">
        <EPBreadCrumb />
    </div>
</template>

<script>
import EPBreadCrumb from './EPBreadCrumb.vue';

export default {
    name: 'EPHeader',
    components: {
        EPBreadCrumb
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
