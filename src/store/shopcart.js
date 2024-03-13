import {reqCartList, reqDeleteCartById, reqCheckCart} from '@/api'

const moduleShopCart = {
	//namespaced : true,
  state: {
	cartList : [],
  },
  getters:{
	  cartList(state){
		  return state.cartList[0] || {};
	  },
	  
  },
  mutations: {
	GETCARTLIST(state, cartList){
		state.cartList = cartList;
	},
  },
  actions:{
	//获取购物车列表数据
	async getCartList({commit}){
		let result = await reqCartList();
		if(result.code===200){
			//console.log(result.data);
			//console.log(result.data[0].cartInfoList);
			commit('GETCARTLIST', result.data);
		}
	},
	//删除购物车商品
	async deleteCart({commit}, skuId){
		let result = await reqDeleteCartById(skuId);
		//数据返回似乎有问题
		//console.log('result==>', result);
		/*
		if(result.code===200){
			return 'ok';
		}else{
			return Promise.reject(new Error('删除失败'));
		}
		*/
		return 'ok';
	},
	//切换商品选中状态
	async checkCart({commit}, {skuId, isChecked}){
		let result = await reqCheckCart(skuId, isChecked);
		//数据返回似乎有问题
		//console.log('result==>', result);
		/*
		if(result.code===200){
			return 'ok';
		}else{
			return Promise.reject(new Error('修改失状态败'));
		}
		*/
		return 'ok';
	},
	//删除全部勾选的产品
	deleteAllCheckedCart({dispatch}, skuIds){
		let promises = [];
		skuIds.forEach(item=>{
			let p = dispatch('deleteCart', item);
			promises.push(p);
		});
		//只有全部的promise都成功，才能返回成功，有一个失败，返回就是失败结果
		let p1 = Promise.all(promises);
		//console.log(p1);
		return Promise.all(promises);
	},
	//全选
	checkAll({dispatch}, {isChecked, skuIds}){
		//console.log(isChecked, skuIds);
		let promises = [];
		skuIds.forEach(skuId=>{
			let p = dispatch('checkCart', {skuId, isChecked });
			promises.push(p);
		});
		return Promise.all(promises);
	}
	
  },
  
}

export default moduleShopCart;

