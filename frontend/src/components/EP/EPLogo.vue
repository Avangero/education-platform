<template>
    <div class="logo">
        <h1 class="title">
            <span class="first-part">GoCpa</span>.<span class="second-part"
                >education</span
            >
        </h1>
    </div>
</template>
<script>
export default {
    name: 'EPLogo'
};
</script>
<style scoped lang="scss">
@import '../../styles/variables';

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: start;
}

.first-part {
    color: $main;
}
</style>
