<template>
    <Sidebar
        :modal="false"
        position="left"
        :autoZIndex="false"
        :visible="isShowNavbar"
        :dismissable="false"
    >
        <template #container>
            <EPLogo />
            <Menu :model="navbarList" style="border: none; border-radius: 0">
                <template #item="{ item, props }">
                    <router-link
                        v-if="item.route"
                        v-slot="{ href, navigate }"
                        :to="item.route"
                        custom
                    >
                        <a
                            v-ripple
                            :href="href"
                            v-bind="props.action"
                            @click="navigate"
                        >
                            <span :class="item.icon" style="font-size: 1rem" />
                            <span
                                class="ml-2"
                                style="
                                    font-size: 1rem;
                                    font-weight: 600;
                                    color: var(--text-color);
                                "
                                >{{ item.label }}</span
                            >
                        </a>
                    </router-link>
                    <a
                        v-else
                        v-ripple
                        :href="item.url"
                        :target="item.target"
                        v-bind="props.action"
                    >
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </template>
            </Menu>
        </template>
    </Sidebar>
</template>
<script>
import EPLogo from './EPLogo.vue';
import Menu from 'primevue/menu';
import Sidebar from 'primevue/sidebar';
import { mapGetters } from 'vuex';

export default {
    name: 'EPSidebar',
    components: { EPLogo, Menu, Sidebar },
    computed: {
        ...mapGetters({
            isShowNavbar: 'navbar/isShow',
            navbarList: 'navbar/getNavbarForRole'
        })
    }
};
</script>

<style lang="scss">
@import '../../styles/variables';

.p-sidebar-left .p-sidebar {
    width: 15rem;
    height: 100%;
    padding: 2.5rem 0 2rem;
    box-shadow: 0 4px 50px var(--primary-100);
}

.pi {
    color: $main;
}
</style>
