<template>
    <div class="content">
        <Button icon="pi pi-bars" text @click="toggleNavbar" />
        <Breadcrumb :model="routesArr">
            <template #item="{ item, props }">
                <router-link
                    v-if="item.route"
                    v-slot="{ href, navigate }"
                    :to="item.route"
                    custom
                >
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']" />
                        <span class="text-primary font-semibold">{{
                            item.label
                        }}</span>
                    </a>
                </router-link>
                <a
                    v-else
                    :href="item.url"
                    :target="item.target"
                    v-bind="props.action"
                >
                    <span class="text-color">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Button from 'primevue/button';
import Breadcrumb from 'primevue/breadcrumb';

export default {
    components: {
        Button,
        Breadcrumb
    },
    computed: {
        ...mapGetters({
            navbarList: 'navbar/getNavbarForRole'
        }),
        routesArr() {
            let fullPath = '';
            return this.$route.path.split('/').reduce((acc, el) => {
                if (el) {
                    fullPath += `/${el}`;
                    return [...acc, { label: el, route: fullPath }];
                }
                return acc;
            }, []);
        }
    },
    methods: {
        ...mapMutations({
            toggleNavbar: 'navbar/TOGGLE_VISIBILITY'
        })
    }
};
</script>

<style lang="scss">
@import '../../styles/variables';

.content {
    display: flex;
}

.p-breadcrumb {
    background: none;
    border: none;
}

.text-primary {
    &:first-letter {
        text-transform: uppercase;
    }
}
</style>
