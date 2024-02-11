<template>
    <div class="container">
        <div class="page-404">
            <RouterLink to="/tasks" class="link">Вернуться домой</RouterLink>
        </div>
    </div>
</template>
<script>
export default {
    name: "NotFound",
};
</script>

<style scoped lang="scss">
.container {
    padding: 50px 40px;
    width: 100%;
}
.page-404 {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100%;

    background-image: url("../images/notFoundPage.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto;
    background-color: #7b78f9;

    border-radius: 32px
}

.link {
    color: white;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 32px;
    text-decoration: none;
    margin-bottom: 50px;
}
</style>
