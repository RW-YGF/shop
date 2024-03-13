import  {reqCategoryList, reqGetBnnerList,　reqFloorList} from '@/api'

const moduleHome = {
	//namespaced : true,
  state: {
    categoryList : [],
	banner : [],
	floorList : [],
  },
  getters:{},
  mutations: {
    increment (state) {
      state.count++
    },
	CATEGORYLIST(state, categoryList){
		state.categoryList = categoryList;
	},
	BANNERLIST(state, banner){
		state.banner = banner;
	},
	FLOORLIST(state, floorList){
		state.floorList = floorList;
	},
	
  },
  actions:{
		//获取列表
		async getCategoryList(context){
			let result = await reqCategoryList();
			//console.log('result*****************');
			if(result.code === 200){
				context.commit('CATEGORYLIST', result.data);
			}
		},
		//获取轮播图
		async getBannerList(context){
			let result = await reqGetBnnerList();
			if(result.code === 200){
				context.commit('BANNERLIST', result.data);
			}	
		},
		
		//获取floor
		async getFloorList(context){
			let result = await reqFloorList();
			//console.log(result.data);			
			if(result.code === 200){
				context.commit('FLOORLIST', result.data);
			}	
		},
	  
  },
  
}

export default moduleHome;

