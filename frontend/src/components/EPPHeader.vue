<template>
    <div class="header">
        <EPPBreadCrumb/>
    </div>
</template>

<script>
import EPPBreadCrumb from "./EPPBreadCrumb.vue";

export default {
    name: 'Header',
    components: {
        EPPBreadCrumb,
    },

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
