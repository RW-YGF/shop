import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import moduleHome from './home.js'
import moduleSearch from './search.js'
import moduleDetail from './detail.js'
import moduleShopCart from './shopcart.js'
import moduleUser from './user.js'
import moduleTrade from './trade.js'

const store = new Vuex.Store({
	modules: {
		home: moduleHome,
		search : moduleSearch,
		detail : moduleDetail,
		shopcart : moduleShopCart,
		user : moduleUser,
		trade : moduleTrade,
		//b: moduleB
	}
  
})

export default store;

