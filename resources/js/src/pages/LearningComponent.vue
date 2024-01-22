<script>
export default {
    name: "LearningComponent"
}
</script>

<template>
    <div class="learning-progress">
        <div class="progress-header">
            <div class="progress-text">Прогресс изучения курса</div>
            <div class="additional-text">10%</div>
        </div>
        <div class="progress-bar">
            <div class="fill-bar" :style="{ width: `10%` }"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../styles/variables";
.learning-progress {
    background-color: white;
    height: 55px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.progress-label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
}

.progress-text {
    color: $main-black;
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0.3px;
}

.progress-bar {
    width: 100%;
    height: 5px;
    margin-top: 10px;
    background-color: $soft-blue;
    border-radius: 10px;
    overflow: hidden;
}

.fill-bar {
    height: 100%;
    background-color: $main-blue;
    border-radius: 10px;
    transition: width 0.5s ease-in-out;
}
.additional-text {
    color: $main-blue;
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0.3px;
}
.progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
</style>
