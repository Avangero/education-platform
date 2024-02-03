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
            errors: 'errorHandling/errors'
        })
    },
    watch: {
        errors: {
            handler(newVal) {
                console.log(newVal, this.toast)
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
        }
    },
    methods: {
        ...mapMutations({
            clearErrors: 'errorHandling/CLEAR_ERRORS'
        })
    }
}
</script>

<style lang="scss">
@import "./src/styles/app.scss";
</style>
