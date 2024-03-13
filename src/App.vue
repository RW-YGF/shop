<template>
  <div id="app">
    <Header />
	<router-view></router-view>
	<Footer  v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header'
import Footer from './components/Footer'

export default {
	name: 'App',
	data(){
		return {
			footerShow : true,

		}
	},
	components: {
    //HelloWorld
	Header, 
	Footer
	},
	
	mounted(){
		
	},
}
</script>

<style scoped lang="less">
*{
	margin:0;
	padding:0;
}

</style>
