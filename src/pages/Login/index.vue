<template>
  <div class="login-container" style="width:100%;background:pink;margin-top:30px;padding:20px 0;">
	<div class="login-wrap" style="border:1px solid #ccc;background:#fff;width:550px;margin:0 auto;">
		<div class="login" style="width:500px;border:1px solid #ccc;margin:20px auto;">
			<div class="loginform">
				<ul class="tab clearFix" style="">
					<li>
						<a href="##">扫描登录</a>
					</li>
					<li style="border-right:none;border-bottom:none;
					border-top:1px solid skyblue;">
						<a href="##" class="current">账户登录</a>
					</li>
				</ul>
				
				<div style="margin-top:30px;">
					<form>
						<div class="input-text clearFix">
							<span></span>
							<input  type="text" placeholder="邮箱/用户名/手机号" v-model="phone"/>
						</div>
						<div class="input-text clearFix">
							<span class="pwd"></span>
							<input  type="text" placeholder="请输入密码" v-model="password"/>
						</div>
						<div class="setting clearFix">
							<label class="checkbox inline">
								<input name="m1" type="checkbox" value="2"/>自动登录
							</label>
							<span class="forget">忘记密码?</span>
						</div>
						<button class="btn" @click.prevent="login">登录</button>
					</form>
					
					<p style="margin:20px auto;width:450px;text-align:right;">
					立即注册</p>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
	return {
		phone : '',
		password : '',
	};
  },
  methods : {
	async login(){
		//需要验证
		if(this.phone=='' || this.password==''){
			return;
		}
		try{
			await this.$store.dispatch('userLogin', {
				phone : this.phone,
				password : this.password,
			});
			//console.log(this.$store.state.user.token);
			let redirect = this.$route.query.redirect || '/home';
			this.$router.push(redirect);
		}catch(error){
			alert('登录失败：'+error);
		}
		
	},
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
}
.clearFix{

}
.tab{
	li{
		list-style:none;
		height:40px;
		line-height:40px;
		text-align:center;
		display:inline-block;
		width:49.8%;
		border-right:1px solid #ccc;
		border-bottom:1px solid #ccc;
	}
	.current{
		color:red;
	}
}
.input-text{
	border:1px solid #333;
	width:450px;
	height:35px;
	margin:10px auto;
	border-radius:3px;
	span{
		width:40px;
		height:35px;
		background:pink;
		display:inline-block;
		float:left;
	}
	input{
		display:inline-block;
		text-indent:3px;
		border:none;
		border-left:1px solid #333;
		height:35px;
		width:408px;
		float:left;
	}
}

.setting{
	width:450px;
	height:35px;
	line-height:35px;
	margin:10px auto;
	position:relative;
	.forget{
		position:absolute;
		right:0;
		font-size:14px;
	}
}
.btn{
	background:red;
	width:450px;
	height:40px;
	line-height:40px;
	margin:10px auto;
	display:block;
	color:#fff;
	letter-space:4px;
}

</style>
