//对axios进行二次封装
import axios from "axios"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import store from '@/store'

//const axios = require('axios');
const requests = axios.create({
  baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  timeout: 5000,
});

// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
	//console.log('在发送请求之前做些什么');
	nprogress.start();
	if(store.state.detail.uuid_token){
		//给后台添加一个字段，要和后台统一好
		config.headers.userTempId = store.state.detail.uuid_token;
	}
	//需要携带token给服务器
	if(store.state.user.token){
		config.headers.token = store.state.user.token;
	}
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
  
// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
	nprogress.done();
	//setTimeout(()=>{
		//console.log('对响应数据做点什么');
		//console.log(response.data);
		//return response;
		return response.data;
	//}, 2000);
	
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
export default requests;