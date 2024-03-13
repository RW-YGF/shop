<template>
<div class="trade-container" style="width:1200px;margin:0 auto;">
	<h3 class="title" style="height:50px;line-height:50px;">填写并核对订单信息</h3>
	<div class="content" style="border:1px solid #bbb;padding:40px 30px;">
		<h5 class="receive" style="height:40px;line-height:40px;">收件人信息</h5>
		<div class="address clearFix" v-for="address in userAddressList" :key="address.id">
			<span :class="{username:true, selected:address.isDefault*1}">
			{{address.consignee}}</span>
			<p @click="changeDefault(address, userAddressList)">
				<span class="s1">{{address.userAddress}}</span>
				<span class="s2">{{address.phoneNum}}</span>
				<span class="s3" v-show="address.isDefault*1">默认地址</span>
			</p>
		</div>
		
		<div class="line"></div>
		
		<h5 class="pay" style="">支付方式</h5>
		<div class="address clearFix">
			<span class="username selected">在线支付</span>
			<span class="username">货到付款</span>
		</div>
		
		<div class="line"></div>
		
		<h5 class="pay">送货清单</h5>
		<div class="way">
			<h5 style="height:30px;font-size:14px;">配送方式</h5>
			<div class="info clearFix">
				<span class="s1">天天快递</span>
				<p>配送时间：预计8月10日(周三)09:00-15:00送达</p>
			</div>
		</div>
		
		<div class="detail" style="">
			<h5 style="height:30px;font-size:14px;">商品清单</h5>
			<ul class="list clearFix" v-for="(detail,index) in detailArrayList">
				<li style="width:10%;">
					<img :src="detail.imgUrl" alt=""/>
				</li>
				<li style="width:50%;">
					<p>{{detail.skuName}} </p>
					<h4>7天无理由退货</h4>
				</li>
				<li style="width:15%;">
					<h3 style="color:red;">￥{{detail.orderPrice}}.00</h3>
				</li>
				<li style="width:10%;">X{{detail.skuNum}}</li>
				<li style="width:10%;">有货</li>
			</ul>
		</div>
		
		<div class="bbs" style="clear:both;">
			<h5 style="height:30px;font-size:14px;">买家留言：</h5>
			<textarea placeholder="建议留言前先与商家沟通" class="remark-cont" v-model="msg"></textarea>
		</div>
		<div class="line"></div>
		
		<div class="bill"> 
			<h5 style="height:30px;font-size:14px;">发票信息：</h5>
			<div style="heihgt:40px;line-height:40px;margin:0 0 10px 20px;font-size:14px;">普通发票(电子)个人明细</div>
			<h5 style="height:30px;font-size:14px;">使用优惠/抵用</h5>
		</div>
	</div>
	
	<div class="money clearFix" style="">
		<ul>
			<li>
				<b><i style="font-style:normal;">{{orderInfo.totalNum}}</i>件商品，总金额</b>
				<span>￥{{orderInfo.totalAmount}}.00</span>
			</li>
			<li>
				<b>返现：</b>
				<span>￥0.00</span>
			</li>
			<li>
				<b>运费：</b>
				<span>￥0.00</span>
			</li>
		</ul>
	</div>
	
	<div style="border:1px solid #bbb;float:left;margin-top:10px;width:100%;padding:20px 0px;"
	class="trade">
		<p style="text-align:right;height:25px;line-height:25px;padding-right:10px;">
		<b>应付金额：</b><span style="color:red;font-weight:bolder;">
		￥{{orderInfo.totalAmount}}.00</span></p>
		<p style="text-align:right;height:25px;line-height:25px;color:#333;font-size:14px;padding-right:10px;">
		寄送至：{{userSelected.userAddress}}，收货人：{{userSelected.consignee}} {{userSelected.phoneNum}}</p>
	</div>
	
	<div style="float:right;border:1px solid red;margin:10px 0 0 0;" class="sub">
		<button style="width:150px;height:50px;background:red;border:none;color:#fff;letter-spacing:2px;font-size:16px;font-weight:bolder;cursor:pointer;"
		@click="submitOrder"
		>提交订单</button>
	</div>
	
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
	name: 'trade',
	data(){
		return {
		//手机买家留言
			msg : '',
		};
	},
	computed : {
		...mapState({
		userAddressList : state=> state.user.userAddressList,
		orderInfo : state=> state.trade.orderInfo,
		}),
		//被选中的地址
		userSelected(){
			return  this.userAddressList.find(item=>item.isDefault == "1") || {} ;
		},
		...mapGetters(['detailArrayList']),
	},
	methods : {
		//修改默认地址
		changeDefault(address, userAddressList){
			userAddressList.forEach(item=>{
				item.isDefault = "0";
			});
			address.isDefault = "1";
			this.userSelected = address;
		},
		//提交订单
		async submitOrder(){
			//交易编码
			let tradeNo = this.orderInfo.tradeNo;
			let orderParams = {
				consignee : this.userSelected.consignee,
				consigneeTel : this.userSelected.phoneNum,
				deliveryAddress : this.userSelected.userAddress,
				paymentWay : 'ONLINE',
				orderComment : this.msg,
				orderDetailList : this.detailArrayList,
			};
			let result = await this.$API.reqSubmitOrder(tradeNo, orderParams);
			console.log(result);
			//提交订单成功
			if(result.code === 200){
				let orderId = result.data;
				alert('order submit success!->'+orderId);
				// api/payment/weixin/createNative/orderId
				this.$router.push({name : 'pay', params : {orderId}});
			}else{
			//提交订单失败
				alert(result.message);
			}
		},
	},
	mounted(){
		this.$store.dispatch('userAddress');
		this.$store.dispatch('tradeList');
	},
}
</script>

<style scoped lang="less">
body *{
	margin:0;
	padding:0;
}	
.address{
	float:left;
	width:100%;
	margin:10px 0 10px 20px;
	span{
		float:left;
	}
	.username{
		border:1px solid #bbb;
		height:25px;
		line-height:25px;
		padding:5px 30px;
		margin-right:10px;
		
	}
	.selected{
		border:1px solid red;
	}
	p{
		float:left;
		height:25px;
		line-height:25px;
		margin:5px 0 0 10px;
	}
	.s1, .s2{
		padding-right:10px;
	}
	.s3{
		height:25px;
		background:#ccc;
		
	}
}
.line{
	margin:20px 0;
	height:1px;
	background:#bbb;
	clear:both;
}
.pay{
	height:30px;
	line-height:30px;
	font-size:15px;
	margin-bottom:10px;
}

.way{
	margin:15px;
	background:#eee;
	padding:30px 10px;
	float:left;width:96%;
}

.info{
float:left;
margin-top:20px;
height:30px;
line-height:30px;
	span{
		float:left;
	}
	.s1{
		border:1px solid #bbb;
		padding:0 20px;
	}
	p{
		margin-left:20px;
		float:left;
	}
}

.detail{
clear:both;
margin:0 15px 15px 15px;
background:pink;
padding:30px 10px;
float:left;
width:96%;
	ul.list{
		list-style:none;
		float:left;
		width:100%;
		li{
			float:left;
			margin:10px 0 0;
			img{
				height:50px;
				border:1px solid #bbb;
			}
		}
	}

}

.remark-cont{
	width:100%;
	height:50px;
	border:1px solid #bbb;
	padding:5px 0;
}
.remark-cont:focus{
	outline:none;
	text-indent:5px;
	
}

.money{
	margin-top:20px;
	float:left;
	width:100%;
	ul{
		list-style:none;
		width:20%;
		float:right;
		li{
			height:35px;
			line-height:35px;
			font-size:14px;
			width:100%;
			b{
				font-style:normal;
				font-weight:normal;
				display:block;
				float:left;
			}
			span{
				float:right;
				display:block;
			}
		}
	}
}



</style>


