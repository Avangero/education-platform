<template>
    <div class="user-info">
        <div class="name-role">
            <div class="name">
                <span>{{user.name}} {{ user.surname }}</span>
            </div>
            <div class="role">
                <span>{{user.role_title}}</span>
            </div>
        </div>
        <div class="user-photo">
            <div class="user-photo-text">{{ user.name.charAt(0)}}</div>
        </div>
        <div class="logout" @click="logout">
            <img :src="icon" alt="logout"/>
        </div>
    </div>
</template>
<script>
import LogoutSvg from '../images/logout.svg'
import {mapActions} from "vuex";
import axios from "axios";

export default {
    name: "UserInfo",
    components: {LogoutSvg},
    data() {
        return {
            user:this.$store.state.auth.user,
            icon: LogoutSvg
        };
    },
    methods: {
        ...mapActions({
            signOut:"auth/logout"

        }),
        async logout(){
            await axios.post('/logout').then(({data})=>{
                this.signOut()
                this.$router.push({name:"login"})
            })
        }
    }
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
    border-radius: 20px;
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
