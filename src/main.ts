import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Components from "@/plugins/Components";
import vuetify from "@/plugins/vuetify";
import Language from "@/plugins/Language";

Vue.config.productionTip = false
Vue.use(Language);
Vue.use(Components);

new Vue({
  router,
  store,
  //@ts-ignore
  vuetify,
  render: h => h(App)
}).$mount('#app')
