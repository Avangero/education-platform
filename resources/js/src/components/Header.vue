<template>
    <div class="header">
        <Sidebar :modal="false" position="left" :autoZIndex="false" :visible="isShowNavbar" :dismissable="false">
            <template #container>
                <Logo />
                <Menu :model="navbarList" style="border-left: none; border-right: none; border-radius: 0;">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                <span :class="item.icon" />
                                <span class="ml-2">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </template>
                </Menu>
            </template>
        </Sidebar>
        <div class="header__left">
            <Button icon="pi pi-bars" text @click="toggleNavbar" />
            <Breadcrumb :model="routesArr">
                <template #item="{ item, props }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a :href="href" v-bind="props.action" @click="navigate">
                            <span :class="[item.icon, 'text-color']" />
                            <span class="text-primary font-semibold">{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                        <span class="text-color">{{ item.label }}</span>
                    </a>
                </template>
            </Breadcrumb>
        </div>
        <slot name="userInfo"></slot>
    </div>
</template>
<script>

import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import {mapGetters, mapMutations} from 'vuex';
import Logo from "./Logo.vue";
import Breadcrumb from 'primevue/breadcrumb';

export default {
    name: "Header",
    components: {
        Button,
        Sidebar,
        Menu,
        Logo,
        Breadcrumb
    },
    data() {
        return{ 
            visible: true,
        }
    },
    computed: {
        ...mapGetters({
            isShowNavbar: 'navbar/isShow',
            navbarList: 'navbar/getNavbarForRole'
        }),
        routesArr() {
            console.log(this.$route)
            return this.$route.path.split('/').reduce((acc, el) => {
                if (el) {
                    return [...acc, {label: el, route: el}]
                } else {
                    return acc
                }
            }, [])
        }
    },
    methods: {
        ...mapMutations({
            toggleNavbar: 'navbar/TOGGLE_VISIBILITY'
        })
    }
};

</script>
<style scoped lang="scss">
@import "../styles/variables";

.header {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;

    &__left {
        display: flex;
    }
}
</style>
