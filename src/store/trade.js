//注册和登录的模块
import  { reqGetTrade, reqSubmitOrder
} from '@/api'

const moduleTrade = {
	//namespaced : true,
  state: {
	orderInfo : {},
  },
  getters:{
	detailArrayList(state){
		return state.orderInfo.detailArrayList || [];
	},
  },
  mutations: {
	GETTRADELIST(state, orderInfo){
		state.orderInfo = orderInfo;
	},
  },
  actions:{
	//获取订单信息
	async tradeList({commit}){
		let result = await reqGetTrade();
		//console.log(result.data);
		if(result.code === 200){
			commit('GETTRADELIST', result.data);
		}
	},
	//提交订单
	async submitOrder(tradeNo, params){
		try{
			let result = await reqSubmitOrder(params);
		}catch(error){
			return Promise.reject(new Error());
		}
	},
	
  },
  
}

export default moduleTrade;

