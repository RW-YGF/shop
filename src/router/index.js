import Vue from 'vue'
import VueRouter from 'vue-router'
//import About from '../components/About'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

Vue.use(VueRouter)

import store from '@/store'
//重写push方法，
//第一个参数，告诉原来push方法，你往哪里跳转（传递哪些参数）
//call 和apply区别
//相同点：都可以调用参数一次， 都可以篡改函数的上下文。
//不同的：传递参数不同，call参数用逗号隔开，apply参数是数组
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location, resolve, reject){
	if(resolve && reject){
		originPush.call(this, location, resolve, reject);
	}else{
		originPush.call(this, location, ()=>{}, ()=>{});
	}
	
}

let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function(location, resolve, reject){
	if(resolve && reject){
		originReplace.call(this, location, resolve, reject);
	}else{
		originReplace.call(this, location, ()=>{}, ()=>{});
	}
	
}

const routes = [
	{
		path : "/home",
		name : 'home',
		component : Home,
		meta : {showFooter : true},
	},
	{
		path : "/",
		name : 'home',
		component : Home,
		meta : {showFooter : true},
	},
	{
		name : 'search',
		path : "/search/:keyword?",
		//path : "/search/",
		component : Search,
		meta : {showFooter : true},
		props : true,
	},
	{
		name : 'detail',
		path : "/detail/:skuid",
		component : Detail,
		meta : {showFooter : true},
		props : true,
	},
	{
		name : 'addCartSuccess',
		path : "/addCartSuccess/:sknum",
		component : AddCartSuccess,
		meta : {showFooter : true},
		props : true,
	},
	{
		name : 'shopCart',
		path : "/shopCart",
		component : ShopCart,
		meta : {showFooter : true},
		props : true,
	},
	{
		name : 'trade',
		path : "/trade",
		component : Trade,
		meta : {showFooter : true},
		beforeEnter: (to, from, next) => {
			if(from.path !== '/shopCart'){
				next(false);
			}else{
				next();
			}
		},
	},
	{
		name : 'pay',
		path : "/pay/:orderId",
		component : Pay,
		meta : {showFooter : true},
		beforeEnter: (to, from, next) => {
			if(from.path == '/trade'){
				next();
			}else{
				next(false);
			}
		},
	},
	{
		name : 'paySuccess',
		path : "/paySuccess",
		component : PaySuccess,
		meta : {showFooter : true},
		beforeEnter: (to, from, next) => {
			if(from.path == '/pay'){
				next();
			}else{
				next(false);
			}
		},
	},
	{
		path : "/login",
		name : 'login',
		component : Login,
		meta : {showFooter : false},
	},
	{
		path : "/register",
		component : Register,
		meta : {showFooter : false},
	},
	{
		path : "/center",
		component : Center,
		meta : {showFooter : true},
		children: [
			{
				name : 'myOrder',
				path: 'myOrder',
				component: MyOrder,
			},
			{
				name : 'groupOrder',
				path: 'groupOrder',
				component: GroupOrder,
			},
			{
				path : '/center',
				redirect : '/center/myOrder',
			}
		],
	},
	//{
		//path : '*',
		//redirect : '/home',
		
	//},
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	},
})

router.beforeEach(async (to, from, next) => {
	//登录了才有token，否则没有
	let token = store.state.user.token;
	if(token){
		try{	
			//token没有过期
			await store.dispatch('getUserInfo');
			//不能进入登录页面
			if(to.name!=='login'){
				next();
			}else{
				next('/home');
			}
		}catch(error){
			//没有获取用户信息，也就是token过期
			if(to.name==='login'){
				//做登出处理，不然会一直递归
				try{
					await store.dispatch('userLogout');
					next('/login');
				}catch(error){}	
			}else{
				//不能去交易、支付、个人中心相关的页面
				if(toPath=='/trade'||toPath=='/paySuccess'||toPath =='/pay'||toPath =='/paySuccess'||toPath =='/center')
				{
					next('/login?redirect='+toPath);
				}else{
					next();
				}
			}
		}
	//没有token
	}else{
		//未登录，不能去交易、支付、个人中心相关的页面
		let toPath = to.path;
		if(toPath=='/trade'||toPath=='/paySuccess'||toPath =='/pay'||toPath =='/paySuccess'||toPath =='/center')
		{
			next('/login?redirect='+toPath);
		}else{
			next();
		}
	}
})

export default router;