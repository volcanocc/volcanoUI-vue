import Vue from 'vue'
import App from './App.vue'
import router from './router'
import demoBlock from './components/demo-block.vue'
import volcanoUI from '../packages/index'
import '../packages/theme-default/lib/index.css'
import 'highlight.js/styles/atom-one-light.css'


Vue.component('demo-block', demoBlock)
Vue.use(volcanoUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
