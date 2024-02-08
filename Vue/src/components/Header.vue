<template>
    <div class="header">
        <Logo/>
        <slot name="userInfo"></slot>
    </div>
</template>
<script>
import Logo from "./Logo.vue";

export default {
    name: "Header",
    components: {Logo},
};

</script>
<style scoped lang="scss">
@import "../styles/variables";

.header {
    background-color: white;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
}

</style>
