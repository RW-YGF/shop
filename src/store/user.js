//注册和登录的模块
import  {reqGetCode, reqUserRegister, reqLogin, reqUserInfo, reqUserLogout,
	reqGetUserAddress
} from '@/api'

const moduleUser = {
	//namespaced : true,
  state: {
	code : '',
	token : localStorage.getItem('TOKEN'),
	userInfo : {},
	userAddressList : [],
  },
  getters:{},
  mutations: {
    CODE(state, code){
		state.code = code;
	},
	LOGINUSER(state, token){
		state.token = token;
	},
	GETUSERINFO(state, userInfo){
		state.userInfo = userInfo;
	},
	EMPTYUSERINFO(state){
		state.userInfo = {};
		state.token = '';
	},
	USERADDRESSLIST(state, userAddressList){
		state.userAddressList = userAddressList
	},
  },
  actions:{
	//获取验证码
	async getCode({commit}, phone){
		let result = await reqGetCode(phone);
		if(result.code === 200){
			commit('CODE', result.data);
		}
	},
	//注册用户
	async userRegister({commit},{phone, password, code}){
		let result = await reqUserRegister({phone, password, code});
		//console.log(result);
		if(result.code === 200){
			return 'ok';
		}else{
			return Promise.reject(new Error(result.message));
		}
	},
	//登录
	async userLogin({commit}, {phone, password}){
		let result = await reqLogin({phone, password});
		if(result.code === 200){
			//console.log(result.data);
			/*
			name: "13800001234"
​
			nickName: "13800001234"
			​
			token: "28d269d2d79841c28f7f84bbb7037083"
			​
			userId: 1858
			*/
			//给token赋值
			commit('LOGINUSER', result.data.token)
			//持久化存储token 
			localStorage.setItem('TOKEN', result.data.token);
			return 'ok';
		}else{
			return Promise.reject(new Error(result.message));
		}
	},
	//获取用户信息
	async getUserInfo({commit}){
		let result = await reqUserInfo();
		//console.log(result.data);
		if(result.code === 200){
			commit('GETUSERINFO', result.data)
			return 'ok';
		}else{
			return Promise.reject(new Error(result.message));
		}
		
	},
	
	//退出登录
	async userLogout({commit}){
		let result = await reqUserLogout();
		//console.log(result.data);
		if(result.code === 200){
			//删除TOKEN
			localStorage.removeItem('TOKEN');
			//清空用户信息
			commit('EMPTYUSERINFO')
			return 'ok';
		}else{
			return Promise.reject(new Error(result.message));
		}
	},
	
	//获取用户地址
	async userAddress({commit}){
		let result = await reqGetUserAddress();
		//console.log(result.data);
		if(result.code === 200){
			commit('USERADDRESSLIST', result.data);
		}
		
	},
	
  },
  
}

export default moduleUser;

