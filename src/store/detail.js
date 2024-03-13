import {reqGoodsInfo, reqAddOrUpdateShopCart} from '@/api'
//封装游客身份模块，生成一个随机字符串
import {getUUID} from '@/utils/uuid_token.js'

const moduleDetail = {
	//namespaced : true,
  state: {
    goodInfo : {},
	uuid_token : getUUID(),
  },
  getters:{
	  //计算出来的这个属性值至少是一个空对象，这样假的报错就不会有了  
	categoryView(state){
		return state.goodInfo.categoryView || {};
	},
	spuSaleAttrList(state){
		return state.goodInfo.spuSaleAttrList || [];
	},
	skuInfo(state){
		return state.goodInfo.skuInfo || {};
	},
	spuSaleAttrList(state){
		return state.goodInfo.spuSaleAttrList || [];
	},
  },
  mutations: {
    GETGOODINFO(state, goodInfo){
		state.goodInfo = goodInfo;
	},
  },
  actions:{
	//获取detail模块数据
	async getDetails({commit}, skuid){
		let result = await reqGoodsInfo(skuid);
		if(result.code===200){
			//console.log(result.data);
			commit('GETGOODINFO', result.data);
		}
	},
	//将产品添加到购物车，或者修改某一个产品的个数
	async addOrUpdateShopCart({commit}, {skuid, skuNum}){
		//加入购物车以后，前台将参数带给服务器
		//服务器写入成功后，并没有返回其他数数据，只是返回code=200，代表成功
		let result = await reqAddOrUpdateShopCart(skuid, skuNum);
		//console.log(result);
		if(result.code === 200){
			return 'ok';
		}else{
			return Promise.reject(new Error('fail:'+result.message));	//	返回失败
		}
		
	},
	
  },
  
}

export default moduleDetail;

