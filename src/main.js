import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 富文本文件
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import VueQuillEditor from 'vue-quill-editor'
import 'lib-flexible/flexible.js' // 引入自适应 1.npm install lib-flexible -Save 2.npm install px2rem -Save
import './assets/global.css'
// 导入全局接口文件
import api from './api/index.js'
Vue.config.productionTip = false
Vue.prototype.$api = api // 挂载在vue全局
// Vue.prototype.$api = api // 挂载在vue全局
Vue.use(ElementUI)
Vue.use(VueQuillEditor) // 将富文本编辑器 注册为全局可用的组件
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
