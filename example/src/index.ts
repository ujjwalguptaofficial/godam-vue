import Vue from "vue";
import Root from "./components/root.vue";
import "flexstyle";
import { store } from "./store";
import GodamPlugin from "godam-vue";

Vue.use(GodamPlugin, store);
const vue = new Vue({
    render: h => h(Root),
    el: '#app',
})
