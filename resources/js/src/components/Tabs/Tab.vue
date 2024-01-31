<template>
    <div :class="{ 'active-tab': isActive }" @click="selectTab">
        <div class="tab">
            <img :src="icon" :class="{ 'active-icon': isActive }" class="tab-icon" alt="Tab Icon"/>
            <span :class="{ 'active-text': isActive }" class="tab-text">{{ text }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: String,
        text: String,
        isActive: Boolean,
    },
    methods: {
        selectTab() {
            this.$emit('select');
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.tab {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    box-sizing: border-box;
    padding-right: 50px;
}

.tab-icon {
    height: 24px;
    width: 24px;
    margin: 0 10px;
    color: red;
    filter: invert(53%) sepia(11%) saturate(22%) hue-rotate(337deg) brightness(97%) contrast(84%);
}

.tab-text {
    color: $text-grey;
    text-align: right;
    font-family: $font-manrop;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    white-space: nowrap;
}


.active-tab {
    height: 50px;
    background-color: $main-blue-light;
    border-radius: 20px;
}

.active-text {
    color: $main-blue;
}

.active-icon {
    filter: invert(33%) sepia(62%) saturate(3901%) hue-rotate(207deg) brightness(97%) contrast(96%);
}

</style>
