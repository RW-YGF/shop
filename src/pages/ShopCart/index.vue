<template>
<div  class="cart">
	<h4>全部商品</h4>
	<div class="cart-main">
		<div class="cart-th">
			<div class="cart-th1">全部</div>
			<div class="cart-th2">商品</div>
			<div class="cart-th3">单价(元)</div>
			<div class="cart-th4">数量</div>
			<div class="cart-th5">小计(元)</div>
			<div class="cart-th6">操作</div>
		</div>
		
		<div class="cart-body">
			<ul class="cart-list" v-for="(cart,inedx) in cartInfoList" :key="cart.id">
				<li class="cart-list-con1">
					<input type="checkbox" name="chk_list" :checked="cart.isChecked"
					@change="changeChek(cart, $event)"/>
				</li>
				<li class="cart-list-con2">
					<img :src="cart.imgUrl" 
					style=""/>
					<div class="item-msg">
					{{cart.skuName}}
					</div>
				</li>
				<li class="cart-list-con3">
					<span class="price">{{cart.skuPrice}}</span>
				</li>
				<li class="cart-list-con4">
					<a href="javascript::void(0)" class="mins" 
					@click="handle('mins', -1, cart)">-</a>
					<input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" 
					@change="handle('change', $event.target.value*1, cart)"/>
					<a href="javascript::void(0)" class="plug" 
					@click="handle('plug', 1, cart)">+</a>
				</li>
				<li class="cart-list-con5">
					<span class="sum">{{cart.skuPrice*cart.skuNum}}</span>
				</li>
				<li class="cart-list-con6" style="">
					<a href="#none" class="sindelet" @click="deleteCart(cart)">删除</a>
					<br/>
					<a href="#none">移到收藏</a>
				</li>
			</ul>
			
		</div>
	</div>
	
	<div class="cart-tool">
		<div class="select-all">
			<input class="chooseAll" type="checkbox" @click="CheckAll" :checked="isAllCheck"/>
			<span>全选</span>
		</div>
		<div class="option">
			<a @click="deleteAll">删除选中的商品</a>
			<a href="#none">移到我的关注</a>
			<a href="#none">清除下柜商品</a>
		</div>
		<div class="money-box">
			<div class="chosed">已选择
				<span>0</span>件商品
			</div>
			<div class="sumprice">
				<em>总价(不含运费):</em>
				<i class="summoney"> {{totalPrice}} </i>
			</div>
			<div class="sumbtn">
				<a class="sum-btn"
				@click="$router.push('/trade')"
				target="_blank">结算</a>
			</div>
		</div>
	</div>
	
	
</div>
</template>

<script>
import {mapGetters} from 'vuex';
import throttle from 'lodash/throttle'

export default {
//http://gmall-h5-api.atguigu.cn/api/cart/cartList
	name: 'shopCart',
	methods : {
		getData(){
			this.$store.dispatch('getCartList');
		},
		//全选
		async CheckAll(e){
			if(this.cartInfoList.length === 0) return;
			let isChecked = e.target.checked ? 1 :0;
			let skuIds = [];
			this.cartInfoList.forEach(item=>{
				skuIds.push(item.skuId);
			});
			try{
				await this.$store.dispatch('checkAll', {
					isChecked : isChecked,
					skuIds : skuIds,
				});
				//alert('check success');
				this.getData();
			}catch(error){
				alert('checkAll fail-->'+error.message);
			}
			
		},
		//单个商品的勾选
		changeChek: throttle(async function(cart, event){
			let cheched = event.target.checked?"1":"0";
			try{
				await this.$store.dispatch('checkCart', {
					skuId : cart.skuId,
					//isChecked : event.target.checked?"1":"0",
					isChecked : event.target.checked?1:0,
				});
				alert('check success');
			}catch(error){
				//可能服务器有点问题
				//alert('check fail-->'+error.message);
			}
			this.getData();
		}, 1000),
		
		//修改产品数量,节流
		handle: throttle(async function(type, disNum, cart){
			switch(type){
				//减号
				case 'mins':
					if(cart.skuNum === 1){
						return ;
					}else{
						disNum = -1;
					}
				break;
				//输入数据变化
				case 'change':
					//输入非法的，非数字的，负数的内容
					if(isNaN(disNum) || disNum<1){
						disNum = 0;
					}else{
						//去掉小数取整
						disNum = parseInt(disNum) - cart.skuNum;
					}
					
				break;
				//加号
				case 'plug':
					disNum = 1;
				break;
			}
			
			try{
				await this.$store.dispatch('addOrUpdateShopCart', {
					skuid : cart.skuId,
					skuNum : disNum,
				});
				//页面数据刷新
				this.getData();
				
			}catch(error){
				alert(error.message);
			}	
			
		},1000),
		//删除单个选中的商品
		deleteCart:async function(cart){
			try{
				await this.$store.dispatch('deleteCart', cart.skuId);
				alert('delete success');
				//页面数据刷新
				//this.getData();
			}catch(error){
				alert('fail==>'+error.message);
			}
			this.getData();
		
		},
		
		//删除选中所有商品
		async deleteAll(){
			let skuIds = [];
			this.cartInfoList.forEach(item=>{
				if(item.isChecked){
					skuIds.push(item.skuId);
				}
			});
			try{
				let r = await this.$store.dispatch('deleteAllCheckedCart', skuIds);
				alert('delete success!');
				this.getData();
			}catch(error){
				alert('fail-->'+error.message);
			}
			//this.getData();
		},
		
		
	},
	computed: {
		...mapGetters(['cartList']),
		//购物车数据
		cartInfoList(){
			return this.cartList.cartInfoList || [];
		},
		//计算总价
		totalPrice(){
			let tp = 0;
			for(let i=0; i<this.cartInfoList.length; i++){
				//console.log(this.cartInfoList[i].isChecked);
				if(this.cartInfoList[i].isChecked === 1){
					tp+= this.cartInfoList[i].skuPrice * this.cartInfoList[i].skuNum;
				}
				
			}
			return tp;
		},
		//判断是否全部勾选
		isAllCheck(){
			return this.cartInfoList.every(item=>item.isChecked==1)
		}
	},
	mounted(){
		this.getData();
	},
}
</script>

<style scoped lang="less">
body *{
	margin:0;
	padding:0;
}
.cart{
	width:1200px;
	float:left;
	h4{
		height:40px;
		line-height:40px;
		font-size:24px;
	}
}

a{
	text-decoration:none;
	color:#000;
}

.itxt{
	width:35px;
	height:30px;
	text-align:center;
	float:left;
	border:1px solid #333;
}
.mins, .plug{
	float:left;
	border:1px solid #333;
	height:30px;
	line-height:30px;
	width:20px;
	padding:0;
	text-decoration:none;
	color:#000;
}
.mins{
	margin-left:30%;
}
.item-msg{
	float:left;
	width:65%;
	margin-left:10px;
}

.cart-main{
	.cart-th{
		border:1px solid #ccc;
		height:40px;
		line-height:40px;
		background:#eee;
		div{
			display:inline-block;
		}
		.cart-th1{
			width:15%;
			text-indent:15px;
		}
		.cart-th2{
			width:35%;
			text-align:center;
		}
		.cart-th3{
			width:10%;
			text-align:center;
		}
		.cart-th4{
			width:17%;
			text-align:center;
		}
		.cart-th5{
			width:10%;
			text-align:center;
		}
		.cart-th6{
			width:13%;
			text-align:center;
			text-align:left;
		}
	}
	
	.cart-body{
		border:1px solid #ccc;
		margin:20px 0 0 0;
		float:left;
		ul.cart-list{
			border-bottom:1px solid #ccc;
			float:left;
			padding:10px 0;
			width:100%;
			li{
				list-style:none;
				float:left;
			}
			.cart-list-con1{
				width:15%;
				text-indent:15px;
			}
			.cart-list-con2{
				width:35%;
				text-align:center;
				img{
					height:50px;
					width:60px;
					border:1px solid #ccc;
					float:left;
				}
			}
			.cart-list-con3{
				width:10%;
				text-align:center;
			}
			.cart-list-con4{
				width:17%;
				text-align:center;
			}
			.cart-list-con5{
				width:10%;
				text-align:center;
			}
			.cart-list-con6{
				width:13%;
				text-align:left;
				a{
					display:inline-block;
					width:100%;
					text-align:left;
					font-size:14px;
				}
			}
		}
	}
}

.cart-tool{
	width:100%;
	height:50px;
	margin-top:10px;
	float:left;
	border:1px solid #ccc;
	.select-all{
		margin-top:10px;
		float:left;
		width:7%;
		.chooseAll{
			margin-left:15px;
		}
		span{
			padding-left:5px;
		}
	}
	.option{
		margin-top:10px;
		float:left;
		a{
			text-decoration:none;
			margin:0 10px 0 0;
			color:#000;
		}
	}
	.money-box{
		float:right;
		div{
			float:left;
		}
		.chosed{
			padding-top:5px;
			margin-right:20px;
		}
		.sumprice{
			padding-top:5px;
			font-size:12px;
			i{
				font-style:normal;
				color:red;
				
			}
			em{
				font-style:normal;
			}
		}
		.sumbtn{
			a{
				text-decoration:none;
				display:inline-block;
				margin-left:90px;
				height:50px;
				line-height:50px;
				width:100px;
				text-align:center;
				font-weight:bolder;
				color:#fff;
				background:red;
			}
			
		}
	}
}

</style>


