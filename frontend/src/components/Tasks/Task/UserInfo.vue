<template>
    <div class="user-info">
        <div class="name-role">
            <div class="name">
                <span>{{ getUser.name }} {{ getUser.surname }}</span>
            </div>
            <div class="role">
                <span>{{ getUser.role_title }}</span>
            </div>
        </div>
        <EPAvatar :id="getUser.id" :name="getUser.name"></EPAvatar>
        <i
            class="pi pi-sign-out"
            style="font-size: 1rem; color: var(--surface-900); cursor: pointer"
            @click="logout"
        ></i>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import EPAvatar from '@components/EP/EPAvatar.vue';

export default {
    name: 'UserInfo',
    components: { EPAvatar },
    methods: {
        ...mapActions({
            signOut: 'auth/logout'
        }),
        async logout() {
            await axios.post('/logout').then(({ data }) => {
                this.signOut();
                this.$router.push({ name: 'login' });
            });
        }
    },
    computed: {
        getUser() {
            return this.$store.state.auth.user;
        }
    }
};
</script>
<style lang="scss">
@import '@styles/variables';

.user-info {
    display: flex;
    align-items: center;
}

.name-role {
    display: flex;
    flex-direction: column;
    margin-right: 0.5rem;
}

.name,
.role {
    text-align: right;
}

.name {
    color: $text-main;
    font-size: 1rem;
    font-weight: 500;
}

.role {
    color: $text-secondary;
    font-size: 0.8rem;
    font-weight: 400;
}
</style>
