<template>
    <div class="logo">
        <h1 class="title">
            <span class="first-part">GoCpa</span>.<span class="second-part">education</span>
        </h1>
    </div>
</template>
<script>
export default {
    name: 'Logo'
}
</script>
<style scoped lang="scss">
@import "../styles/variables";

.logo {
    display: flex;
    justify-content: center;
}

.title {
    font-family: $font-manrop;
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
}

.first-part {
    color: $main-black;
}

.second-part {
    color: $main-blue;
}
</style>
