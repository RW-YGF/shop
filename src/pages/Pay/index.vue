<template>
<div class="pay-main">
	<div class="pay-container" style="">
		<div class="checkout-tit">
			<h4 class="tit-txt">
				<span class="success-icon" style=""></span>
				<span class="success-info" 
				style="">
				订单提交成功，请您及时付款，以便尽快为您发货</span>
			</h4>
			<div class="paymark">
				<span class="fl">请您在提交订单4小时之内完成支付，超时订单会自动取消。订单号：
				{{orderId}}</span>
				<span class="fr">应付金额：
				<b style="color:red;">￥{{payInfo.totalFee}}</b></span>
			</div>
			
			<div class="checkout-info">
				<h4>重要说明：</h4>
				<ol>
					<li>XXX商城目前支持支付宝方式付款</li>
					<li>其他支付渠道正在调试中，敬请期待</li>
					<li>为了保障您的购物流程顺利完成，请保存以下支付宝信息</li>
				</ol>
				<h4>支付宝账户信息：(很重要，<span class="save">请保存！！</span>)</h4>
				<ul>
					<li>支付账号：111111</li>
					<li>密码：111111</li>
					<li>支付密码：111111</li>
				</ul>
			</div>
			
			<div class="checkout-steps">
				<div class="step-tit">
					<h5>支付平台</h5>
				</div>
				<div class="step-cont">
					<ul class="payType">
						<li>微信支付</li>
						<li>支付宝支付</li>
					</ul>
				</div>
				
				<p style="height:1px;background:#bbb;width:1160px;float:left;margin:20px;"></p>
				<div class="step-tit">
					<h5>支付网银</h5>
				</div>
				<div class="step-cont">
					<ul class="payType">
						<li>招商银行</li>
						<li>农业银行</li>
						<li>招商银行</li>
						<li>农业银行</li>
						<li>招商银行</li>
						<li>农业银行</li>
						<li>招商银行</li>
						<li>农业银行</li>
						<li>招商银行</li>
						<li>农业银行</li>
						<li>招商银行</li>
						<li>农业银行</li>
					</ul>
				</div>
				<p style="height:1px;background:#bbb;width:1160px;float:left;margin:20px;"></p>
				<div class="submit">
					<!-- <router-link to="" @click="open">立即支付</router-link> -->
					<a @click="open">立即支付</a>
				</div>
				
				<div class="step-tit">
					<h5>其他支付方式</h5>
				</div>
				<div class="step-cont">
					<ul class="payType">
						<li>招商银行</li>
						<li>农业银行</li>
						<li>招商银行</li>
						<li>农业银行</li>
						<li>招商银行</li>
						<li>农业银行</li>
						<li>招商银行</li>
						<li>农业银行</li>
						<li>招商银行</li>
						<li>农业银行</li>
						<li>招商银行</li>
						<li>农业银行</li>
					</ul>
				</div>
			</div>
			
		</div>
	</div>

</div>
</template>

<script>
import QRCode from 'qrcode'

export default {
	name: 'pay',
	data(){
		return {
			payInfo : {},
			timer : null,
			code : 0,
		};
	},
	computed : {
		orderId(){
			//5200
			return this.$route.params.orderId;
		},
		
	},
	methods :{
		//获取支付信息
		async getPayInfo(){
			let result = await this.$API.reqPayment(this.orderId);
			//console.log(result.data);
			if(result.code === 200){
				//data的对象信息
				// codeUrl orderId  resultCode totalFee
				this.payInfo = result.data;
			}else{
				alert(result.message);
			}
			
		},
		
		//遮罩层弹出框
		async open(){
			 try{
				//生成一个二维码 
				//console.log(this.payInfo.codeUrl);
				let url = await QRCode.toDataURL(this.payInfo.codeUrl);
				//弹窗支付二维码对话框
				this.$alert(`<img src=${url} />`, 
					'付款二维码', 
					{
						dangerouslyUseHTMLString: true,
						//是否居中
						center:true,
						//是否显示取消按钮
						showCancelButton : true,
						cancelButtonText : '支付遇见问题',
						confirmButtonText : '已经支付成功',
						showClose : false,
						//关闭之前
						beforeClose: (type, instance, done)=>{
							//type区分是取消还是确定
							//instance 当前组件实例
							//done关闭弹框的方法
							if(type === 'cancel'){
								alert('请联系管理员');
								clearInterval(this.timer);
								this.timer = null;
								//关闭弹框
								done();
							}
							if(type === 'confirm'){
								//判断是否真的支付
								if(this.code === 200){
									clearInterval(this.timer);
									this.timer = null;
									done();
									this.$router.push('/paySuccess');
								}else{
									alert('支付不成功');
								}
							}
							
						},
					}
				);
				/***************/
				//你需要知道支付成功或者失败
				//支付成功，路由跳转，如果支付失败，提示信息
				//需要长轮询
				if(!this.timer){
					this.timer = setInterval(async ()=>{
						let result = await this.$API.reqGetPayState(this.orderId);
						console.log(result);
						//Object { code: 205, message: "支付中", data: null, ok: false }
						this.code = result.code;
						if(result.code === 200){
							alert('支付成功');
							//清除定时器
							clearInterval(this.timer);
							this.timer = null;
							//保存支付成功返回的code
							this.code = result.code;
							//关闭弹出框
							this.$msgbox.close();
							//跳转到下一个路由
							this.$router.push('/paySuccess');
						}
					}, 5000);
				}
				
			}catch(error){
				//console.error(error);
				alert('订单过期了');
			}
			
		},
	},
	mounted(){
		this.getPayInfo();
	},
}
</script>

<style scoped lang="less">
.pay-container *{
	margin:0;
	padding:0;
	
}
.pay-container{
	width:1200px;
	margin:0 auto;
}

.tit-txt{
width:100%;
height:40px;
line-height:40px;
}
.success-icon{
width:35px;
height:35px;
border:3px solid green;
display:inline-block;
float:left;
border-radius:25px;
}
.success-info{
margin-left:10px;
display:inline-block;
float:left;
}
.paymark{
height:40px;
line-height:40px;
	.fl{
		display:block;
		float:left;
		margin-left:10px;
	}
	.fr{
		display:block;
		float:right;
	}

}
.checkout-info{
	border:2px solid red;
	padding:20px 30px;
	h4{
		height:40px;
		line-height:40px;
		color:red;
		font-weight:border;
	}
	ol, ul{
		padding:0 30px;
		li{
			height:30px;
			line-height:30px;
			color:#333;
		}
	}
}

.checkout-steps{
	border:1px solid #bbb;
	margin:20px 0;
	padding:30px 0 30px 0px;
	float:left;
	width:100%;
	.step-tit{
		font-size:16px;
		padding:20px 0 20px 20px;
		float:left;
		width:100%;
	}
	.step-cont{
		float:left;
		padding-left:20px;
		ul.payType{
			list-style:none;
			float:left;
			width:100%;
			li{
				border:1px solid #ccc;
				height:50px;
				line-height:50px;
				width:150px;
				margin:10px 10px 0 0;
				float:left;
				text-align:center;
			}
		}
	}
}
.submit{
	border:1px solid red;
	clear:both;
	width:150px;
	height:50px;
	margin:0 auto;
}
.submit a{
width:100%;
line-height:50px;
height:50px;
text-align:center;
text-decoration:none;
background:red;
border:none;
font-size:18px;
color:#fff;
display:block;

}
</style>


