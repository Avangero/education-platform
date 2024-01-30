<template>
    <div class="page-404">
        <RouterLink to="/tasks" class="link">Вернуться домой</RouterLink>
    </div>
</template>
<script>
export default {
    name: "NotFound",
};
</script>

<style scoped lang="scss">
.page-404 {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 50px 40px;
    width: 100%;
    background-image: url("../images/notFoundPage.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto;
    background-color: #7b78f9;

    .link{
        color: white;
        font-size: 32px;
    }
}
</style>
