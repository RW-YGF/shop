<template>
<div class="register-container" style="width:1200px;border:1px solid #ccc;margin-top:20px;">
	<div>
		<h3 style="background:#eee;height:40px;line-height:40px;text-indent:15px;font-size:22px;
		margin-bottom:40px;position:relative;">
			注册新用户
			<span class="go" 
			style=""> 
			我有账号，去<a href="login.html" style="color:red;">登录</a>
			</span>
		</h3>
		<div class="content">
			<label>手机号：</label>
			<input type="text" placeholder="请输入你的手机号"
			value="" v-model="phone"/>
			<span class="error-msg" style="">13800001234提示错误信息</span>
		</div>
		
		<div class="content">
			<label>验证码：</label>
			<input type="text" placeholder="请输入验证码" v-model="code"/>
			<button style="width:85px;height:35px;" @click="getCode">获取验证码</button>
			<span class="error-msg">提示错误信息</span>
		</div>
		
		<div class="content">
			<label>登录密码：</label>
			<input type="password" placeholder="请输入你的登录密码" v-model="password"/>
			<span class="error-msg">提示错误信息</span>
		</div>
		
		<div class="content">
			<label>确认密码：</label>
			<input type="password" placeholder="请输入确认密码" v-model="password1"/>
			<span class="error-msg">提示错误信息</span>
		</div>
		
		<div class="content">
			<input type="checkbox" name='m1' :checked="agree"
			style="height:15px;width:15px;margin-left:85px;"/>
			<span>同意协议并注册</span>
			<span class="error-msg">提示错误信息</span>
		</div>
		
		<div class="btn">
			<button @click="register">完成注册</button>
		</div>
		
	</div>
</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Register',
  data(){
	return {
		phone : '',
		//code : '',
		password : '',
		password1 : '',
		agree: true,
	};
  },
  methods : {
	//获取验证码
	getCode(){
		//简单判断一下
		if(this.phone === ''){
			alert('input phone');
			return;
		}
		this.$store.dispatch('getCode', this.phone);
	},
	//注册新用户
	async register(){
		//需要判断和验证
		try{
			//userRegister
			await this.$store.dispatch('userRegister', {
				phone : this.phone, 
				password : this.password, 
				code : this.code,
			});
			this.$router.push('/login');
		}catch(error){
			alert('register fail-->'+error);
		}
		
	},
	
	
  },
  computed:{
	...mapState({code : (state)=>state.user.code}),
	
  }
  
}
</script>

<style scoped lang="less">
body *{
margin:0;
padding:0;
}
.content, .btn{
width:35%;
margin:0 auto;
height:60px;
line-height:40px;
position:relative;
	label{
		display:inline-block;
		width:90px;
		text-align:right;
	}
	.go{
		font-size:16px;
		position:absolute;
		right:10px;
	}
	.error-msg{
		color:red;
		position:absolute;
		top:30px;
		left:90px;
		font-size:14px;
	}
	input{
		border:1px solid #333;
		height:35px;
		width:240px;
	}
}
.btn button{
	margin-left:85px;
	width:250px;
	height:35px;
	background:red;
	border:1px solid black;
	color:#fff;
}

</style>
