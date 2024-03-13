<template>
	<header class="header">
	<div class="top"  style="width:100%;height:40px;background:#eee;">
		<div class="container" style="width:1200px;margin:0 auto;">
			<div class="loginList">
				<p>
				   <router-link to="/home">XXX  </router-link>欢迎您!&nbsp&nbsp
				</p>
				<p v-if="!loginName">
					<span>请</span>
					<router-link to="/login">登录</router-link> ||
					<router-link class="register" to="/register">免费注册</router-link>
				</p>
				<p v-else>
					<a>{{loginName}}</a> |
					<a href="javascript:" @click="logout">退出登录</a>
				</p>
			</div>
			<div class="typeList">
				<router-link to="/center">我的订单</router-link>
				<router-link to="/shopCart">我的购物车</router-link>
				<a href="###">我的商城</a>
				<a href="###">商城会员</a>
				<a href="###">企业采购</a>
				<a href="###">关注商城</a>
				<a href="###">合作招商</a>
				<a href="###">商家后台</a>
			</div>
		</div>
	</div>
	<!-- 搜索区域 -->
	<div style="width:1200px;height:80px;margin:0 auto;position:relative;">
		<input type="text" class="inputSearch"　v-model="keyword"/>
		<button class="btnSearch" @click="goSearch">search</button>
	</div>
  </header>
</template>

<script>
export default {
	name: 'Header',
	data(){
		return {
			keyword :'',
		}
	},
	methods :　{
		//搜索功能
		goSearch(){
			//console.log('query', this.$route.query);
			let location = {
				name: 'search', 
				params: { keyword: this.keyword ||undefined  },
			};
			if(JSON.stringify(this.$route.query) !== '{}'){
				location.query = this.$route.query;
			}
			this.$router.push(location);
			
		},
		//退出登录
		async logout(){
			try{
				await this.$store.dispatch('userLogout');
				this.$router.push('/home');
			}catch(error){
				alert('logout fail-->'+error);
			}
			
		},
	},
	computed : {
		loginName(){
			return this.$store.state.user.userInfo.loginName;
		},
	},
	mounted(){
		this.$bus.$on("clear", ()=>{
			//console.log(this.keyword);
			this.keyword = '';
		});
		
	},
}
</script>

<style scoped lang="less">
body *{
	margin:0;
	padding:0;
}
a{
	text-decoration:none;
	color:#000;
	cursor:pointer;
}
.loginList{
	float:left;
	margin:10px 0 0 10px;
	p{
		display:inline-block;
	}
}

.typeList{
	float:right;
	margin:10px 20px 0 0;
	a{
		display:inline-block;
		height:20px;
		line-height:20px;
		border-right:1px solid #ccc;
		padding:0 5px;
		font-size:14px;
	}
	a:last-child{
		border-right:none;
	}
}
.inputSearch{
	position:absolute;
	right:88px;
	top:20px;
	height:38px;
	line-height:38px;
	width:350px;
	border-radius:3px;
	text-indent:4px;
	font-size:16px;
}
.inputSearch:focus{
	outline: none;
}
.btnSearch{
	position:absolute;
	right:10px;
	top:20px;
	height:40px;
	line-height:40px;
	width:80px;
	background:red;
	color:#fff;
	border:1px solid #333;
	font-size:16px;
}

</style>
