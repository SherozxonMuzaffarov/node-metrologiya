import "./assets/main.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { useErrorStorage } from "./stores/error";
import axios from "axios";

let BASE_URL = "http://127.0.0.1:3000";

const app = createApp(App);
app.use(createPinia());

const errorStore = useErrorStorage();

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response) {
            errorStore.setError(error.response.data.message);
        }
        return Promise.reject(error);
    }
);

axios.interceptors.request.use(
    function (config) {
        config.headers["auth-token"] = localStorage.getItem("token");
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.defaults.baseURL = BASE_URL;
app.use(router);
app.mount("#app");
