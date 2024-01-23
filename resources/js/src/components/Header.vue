<template>
    <div class="header">
        <div class="logo">
            <h1 class="title">
                <span class="first-part">GoCpa</span>.<span class="second-part">education</span>
            </h1>
        </div>
        <div class="user-info">
            <div class="name-role">
                <div class="name">
                    <span>Александр Филин</span>
                </div>
                <div class="role">
                    <span>Студент</span>
                </div>
            </div>
            <div class="user-photo">
                <img src="../images/photo_2023-07-26_18-13-00.jpg" alt="Фотография пользователя" width="50" height="50"
                     style="margin-right: 50px;">
            </div>
        </div>
    </div>
</template>

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

.logo {
    display: flex;
    flex-direction: column;
}

.title {
    font-family: 'Manrope', sans-serif;
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

.user-info {
    display: flex;
    align-items: center;
}

.name-role {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
}

.name, .role {
    text-align: right;
    font-family: 'Manrope', sans-serif;
}

.name {
    color: $main-black;
    font-size: 20px;
    font-weight: 500;
}

.role {
    color: $text-grey;
    font-size: 16px;
    font-weight: 400;
}

.user-photo {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 20px;
    display: flex;
    align-items: center;
}
</style>
