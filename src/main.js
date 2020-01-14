import Vue from 'vue'
import App from './App.vue'
require('aframe');
require('aframe-geometry-merger-component');
require('./components/hide-targets');


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
