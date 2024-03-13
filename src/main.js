import Vue from 'vue'
import { Button, MessageBox } from 'element-ui'
import App from './App.vue'

Vue.use(Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import Swiper from '@/components/Swiper'
//注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
Vue.component(Swiper.name, Swiper);

import router from './router'
import store from './store'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
//统一引入api文件夹中的全部请求函数
import * as API from '@/api'



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线的配置
  beforeCreate(){
	  Vue.prototype.$bus = this;
	  Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount('#app')



