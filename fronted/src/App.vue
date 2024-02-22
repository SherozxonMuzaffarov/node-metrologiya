<template>
    <div class="container">
        <BAlert
            class="alerts"
            v-model="dismissCountDown"
            dismissible
            v-if="errorStorage.error"
            variant="danger"
            @close-countdown="countdown = $event"
        >
            <p>{{ errorStorage.error }} {{ countdown / 1000 }} seconds...</p>
            <BProgress
                variant="danger"
                :max="dismissCountDown"
                :value="countdown"
                height="4px"
            />
        </BAlert>
    </div>
        <RouterView />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useErrorStorage } from "./stores/error";
import { useRouter } from "vue-router";

const router = useRouter();
const dismissCountDown = ref(5000);
let countdown = ref(0);
const errorStorage = useErrorStorage();

onBeforeMount(() => {
    if (!localStorage.getItem("token")) {
        router.push({ path: "/login" });
    }
});
</script>
