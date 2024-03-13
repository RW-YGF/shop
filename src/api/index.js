import requests from './request.js'
import mockRequests from './mockAjax.js'

//三级联动
//  api/product/getBaseCategoryList

export const reqCategoryList = ()=>
	//发请求axios发请求返回结果是promise对象
	requests({
		url : '/product/getBaseCategoryList',
		method: 'get',
	});
	
export const reqGetBnnerList = ()=>
	//获取banner轮播图数据
	mockRequests({
		url : '/banner',
		method: 'get',
	});
	
//
export const reqFloorList =()=>
	mockRequests({
		url : '/floor',
		method: 'get',
	});
	
//获取搜索模块数据，地址 :api/list 请求方式post
/*
{
	"category3Id" : "61",
	"categoryName" : "手机",
	"keyword" : "小米",
	"order" : "1:desc",
	"pageNo" : "1",
	"pageSize" : "10",
	"props" : ["1:1700-2799:价格", "2:6.65-6.74英尺：屏幕英尺"],
	"trademark" : "4:小米",
}	
*/
//params至少是个空数组
export const reqGetSearchInfo =(params)=> 
	requests({
		url : '/list',
		method: 'post',
		data : params,
	});
	
//获取产品详情的接口
export const reqGoodsInfo =(skuId)=>
	requests({
		url : `/item/${skuId}`,
		method: 'get',
	});
	
//请产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId, skuNum)=>
	requests({
		url : `/cart/addToCart/${skuId}/${skuNum}`,
		method: 'post',
	});
	
//获取购物车接口数据
export const reqCartList = ()=>
	requests({
		url : '/cart/cartList',
		method: 'get',
	});
	
//删除购物车商品的接口
export const reqDeleteCartById =(skuId)=>
	requests({
		url : `/cart/deleteCart/${skuId}`,
		method: 'delete',
	});


//切换商品选中状态
export const reqCheckCart=(skuId, isChecked)=>
	requests({
		url : `/cart/checkCart/${skuId}/${isChecked}`,
		//url : '/cart/checkCart/17/0',
		method: 'get',
	});


//获取验证码
export const reqGetCode = (phone)=>
	requests({
		url : `/user/passport/sendCode/${phone}`,
		method: 'GET',
});

//注册用户
export const reqUserRegister = (params)=>
	requests({
		url : '/user/passport/register',
		method: 'post',
		data : params,
});

//登录
export const reqLogin = (params)=>
	requests({
		url : '/user/passport/login',
		method: 'post',
		data : params,
});

//带着用户的token获取用户信息
// /user/passport/auth/getUserInfo
export const reqUserInfo = ()=>
	requests({
		url : '/user/passport/auth/getUserInfo',
		method: 'get',
});

//退出登录
export const reqUserLogout = ()=>
	requests({
		url : '/user/passport/logout',
		method: 'get',
});

//获取用户地址信息
export const reqGetUserAddress =()=>
	requests({
		url : '/user/userAddress/auth/findUserAddressList',
		method: 'get',
});

//获取订单交易信息
export const reqGetTrade =()=>
	requests({
		url : '/order/auth/trade',
		method: 'get',
});

//提交订单
export const reqSubmitOrder =(tradeNo, params)=>
	requests({
		url : `/order/auth/SubmitOrder?tradeNo=${tradeNo}`,
		method: 'post',
		data : params,
});

//获取订单支付信息
export const reqPayment =(orderId)=>
	requests({
		url : `/payment/weixin/createNative/${orderId}`,
		method: 'get',
});

//获取支付订单状态
export const reqGetPayState = (orderId)=>
	requests({
		url : `/payment/weixin/queryPayStatus/${orderId}`,
		method: 'get',
});

//获取订单列表
export const reqGetOrderAuth = (page, limit)=>
	requests({
		url : `/order/auth/${page}/${limit}`,
		method: 'get',
});