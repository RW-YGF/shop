import {reqGetSearchInfo} from '@/api'

const moduleSearch = {
	//namespaced : true,
  state: {
    searchList : {},
  },
  getters:{
	goodsList(state){
		return state.searchList.goodsList || [];
	},
	trademarkList(state){
		return state.searchList.trademarkList || [];
	},
	attrsList(state){
		return state.searchList.attrsList || [];
	}, 
	totalPages(state){
		return state.searchList.totalPages || 1;
	},
	total(state){
		return state.searchList.total || 1;
	},
  },
  mutations: {
    GETSEARCHLIST(state, searchList) {
		state.searchList = searchList;
    }
  },
  actions:{
	//获取search模块数据
	async getSearchInfoList({commit}, params={}){
		let result = await reqGetSearchInfo(params);
		if(result.code === 200){
			//console.log(result.data);
			commit('GETSEARCHLIST', result.data);
		}
	},
	  
  },
  
}

export default moduleSearch;

