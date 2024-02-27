<template>
    <div class="main container">
        <img class="logo" src="../assets/images/logo.jpg" alt="" />
        <form @submit.prevent="submit" class="card shadow shadow-lg">
            <div class="card-body">
                <h3 class="text-center">E-OMBOR LOGIN</h3>
                <div class="mb-3">
                    <label class="form-label">Telefon raqam</label>
                    <input
                        v-model="formData.phone_number"
                        type="text"
                        placeholder="Telefon raqam"
                        class="form-control"
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Parol</label>
                    <input
                        v-model="formData.password"
                        type="password"
                        placeholder="Parol"
                        class="form-control"
                    />
                </div>
                <div class="">
                    <button class="btn btn-dark w-100">Login</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let formData = ref({
    phone_number: null,
    password: null,
});

const submit = async () => {
    try {
        let res = await axios.post("/auth/login", formData.value);
        if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userData",JSON.stringify(res.data.user));
            router.push({ path: "/metrology" });
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<style lang="scss" scoped>
.main {
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    .card {
        position: absolute;
        top: 60%;
        right: 50%;
        left: 50%;
        width: 400px;
        transform: translate(-50%, -50%);
    }

    .logo {
        position: absolute;
        top: 10%;
        width: 200px;
        height: 200px;
        right: 50%;
        left: 42%;
    }
}
</style>
