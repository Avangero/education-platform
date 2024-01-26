<template>
    <div class="page-container">
        <div class="login-container">
            <Logo style="margin-left: 20px"></Logo>
            <div class="form-container">
                <form class="login-form" @submit.prevent="login">
                    <div class="login-header">Добро пожаловать!</div>
                    <input v-model="loginForm.email" type="email" class="login-email" name="email" required
                           placeholder="Email">
                    <input v-model="loginForm.password" type="password" class="login-password" name="password" required
                           placeholder="Password">
                    <button type="submit" class="login-button">Войти</button>
                </form>
            </div>
        </div>
        <div class="bg"></div>
    </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import ProgressBar from "../components/ProgressBar.vue";
import axios from "axios";

export default {
    components: {
        ProgressBar,
        Logo,
    },
    data() {
        return {
            loginForm: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async login() {
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
            axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

            axios.post('/api/login', this.loginForm)
                .then(response => {
                    const token = response.data.access_token;
                    localStorage.setItem('access_token', token);
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
};
</script>


<style lang="scss">
@import "../styles/variables";

.page-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
}

.login-container {
    height: 100%;
    width: 35%;
}

.bg {
    height: 100%;
    width: 65%;
    background: $main-blue;
    background: linear-gradient(60deg, rgba(232, 240, 254, 1) 0%, rgba(23, 110, 242, 1) 100%);
}

.login-header {
    font-family: 'Manrope', sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    color: $main-black;
    text-align: center;

    margin-bottom: 30px;
}

.login-form {
    margin-top: 200px;
    height: calc(100% - 100px);
    width: 60%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.login-email,
.login-password {
    width: 80%;
    height: 50px;
    border: none;
    border-radius: 24px;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
}

input {
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    color: $main-black;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.login-button {
    width: 80%;
    margin-top: 20px;
    height: 50px;
    border: none;
    border-radius: 24px;
    box-sizing: border-box;
    background-color: $main-blue;
    font-family: 'Manrope', sans-serif;
    color: white;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    cursor: pointer;
}
</style>
