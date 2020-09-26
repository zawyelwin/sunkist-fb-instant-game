import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";
import transition from "vue-page-transition";
import loading from "@/components/Loading.vue";

import "./plugins/font-awesome";
import "./assets/css/app.css";
import "./assets/js/app.js";

Vue.prototype.$http = axios;
Vue.use(transition);
Vue.component("loading", loading);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
