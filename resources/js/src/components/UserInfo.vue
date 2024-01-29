<template>
    <div class="user-info">
        <div class="name-role">
            <div class="name">
                <span>{{ user.name }} {{ user.surname }}</span>
            </div>
            <div class="role">
                <span>{{ user.role_title }}</span>
            </div>
        </div>
        <div class="user-photo">
            <div class="user-photo-text">{{ user.name?.charAt(0) }}</div>
        </div>
        <div class="logout" @click="logout">
            <img :src="icon" alt="logout"/>
        </div>
    </div>
</template>
<script>
import LogoutSvg from '../images/logout.svg'
import {mapActions, mapState} from "vuex";
import {post} from "../../utils/index.js";

export default {
    name: "UserInfo",
    components: {LogoutSvg},
    computed: {
        ...mapState('auth', ['user'])
    },
    data() {
        return {
            icon: LogoutSvg
        };
    },
    methods: {
        ...mapActions({
            signOut: "auth/logout",
            getUser: "auth/getUser"

        }),
        logout() {
            post('/logout').then(({data}) => {
                this.signOut()
            })
        }
    },

    created() {
        this.getUser()
    },
};

</script>
<style scoped lang="scss">
@import "../styles/variables";

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
    font-family: $font-manrop;
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
    border-radius: $main-avatar-border-radius;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $main-blue-light;
}

.user-photo-text {
    font-family: $font-manrop;
    font-weight: 800;
    color: white;
    font-size: 24px;
}

.logout {
    cursor: pointer;
    margin-left: 10px;
    filter: invert(13%) sepia(9%) saturate(0%) hue-rotate(136deg) brightness(96%) contrast(99%);
}

.logout:hover {
    cursor: pointer;
    margin-left: 10px;
    filter: invert(28%) sepia(79%) saturate(2310%) hue-rotate(208deg) brightness(99%) contrast(92%);
}
</style>
