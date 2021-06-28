import Vue from 'vue'
import App from './App.vue';
import store from './store/index';
import GodamPlugin from "godam-vue";

Vue.config.productionTip = false
window['GodamPlugin'] = GodamPlugin;
Vue.use(GodamPlugin, store);

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
