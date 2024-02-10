<template>
    <router-view></router-view>
    <Toast/>
</template>

<script>
import Toast from "primevue/toast";
import {useToast} from "primevue/usetoast";
import {mapGetters, mapMutations} from "vuex";

export default {
    name: 'app',
    components: {Toast},
    data() {
        return {
            toast: useToast()
        }
    },
    computed: {
        ...mapGetters({
            errors: 'toasts/errors',
            successes: 'toasts/successes'
        })
    },
    watch: {
        errors: {
            handler(newVal) {
                if (newVal) {
                    newVal.forEach((error) => {
                        this.toast.add({
                            severity: "error",
                            summary: "Произошла ошибка",
                            detail: error.response.data.message,
                            life: 3000,
                        });
                    });
                    this.clearErrors();
                }
            },
            deep: true
        },
        successes: {
            handler(newVal) {
                if (newVal) {
                    newVal.forEach((success) => {
                        this.toast.add({
                            severity: "success",
                            summary: "Успех",
                            detail: success,
                            life: 3000,
                        });
                    });
                    this.cleareSuccesses();
                }
            },
            deep: true
        }
    },
    methods: {
        ...mapMutations({
            clearErrors: 'toasts/CLEAR_ERRORS',
            cleareSuccesses: 'toasts/CLEAR_SUCCESSES'
        })
    }
}
</script>

<style lang="scss">
@import "./src/styles/app.scss";
</style>
