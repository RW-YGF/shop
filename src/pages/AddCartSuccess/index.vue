<template>
<div class="cart-complete-wrap">
	<div class="cart-complete">
		<h3><i class="sui-icon icon-pc-right"></i>商品已经成功加入购物车！</h3>
		<div class="goods">
			<div class="left-good">
				<div class="left-pic">
					<img :src="skuInfo.skuDefaultImg" />
				</div>
				
				<div class="right-info">
					<p class="title">{{skuInfo.skuName}}</p>
					<p class="attr">{{skuInfo.skuName}} 数量：{{$route.params.sknum}}</p>
				</div>
			</div>
			
			<div class="right-gocart">
				<router-link :to="{name: 'detail', params: { skuid: skuInfo.id}}">
				查看商品详情</router-link>
				<router-link to="/shopCart">去购物车结算 ></router-link>
			</div>
		</div>
	</div>
	
	<!--
	<div class="cart-complete">
		<h3><i class="sui-icon icon-pc-right"></i>商品已经成功加入购物车！</h3>
		<div class="goods">
			<div class="left-good">
				<div class="left-pic">
					<img :src="skuInfo.skuDefaultImg" />
				</div>
				
				<div class="right-info">
					<p class="title">{{skuInfo.skuName}}</p>
					<p class="attr">{{skuInfo.skuName}} 数量：{{$route.params.sknum}}</p>
				</div>
			</div>
			
			<div class="right-gocart">
				<a href="javascript:" class="sui-btn btn-xlarge">查看商品详情</a>
				<a href="javascript:">去购物车结算 ></a>
			</div>
		</div>
	</div>
	-->
	
</div>
</template>

<script>
export default {
	name: 'addCartSuccess',
	computed : {
		skuInfo(){
			return JSON.parse(sessionStorage.getItem("SKUINFO"));
		},
	},
	mounted(){
		//console.log(this.skuInfo);
	}
}
</script>

<style scoped lang="less">
body *{
	margin:0;
	padding:0;
}
.cart-complete-wrap{
	width:1200px;
}
.cart-complete{
	padding:20px 0;
	background:#eee;
	float:left;
	h3{
		text-indent:20px;
		height:30px;
		line-height:30px;
		color:green;
		margin-bottom:30px;
	}
	.goods{
		width:100%;
		float:left;
		.left-good{
			float:left;
			width:800px;
			.left-pic{
				float:left;
				img{
					width:80px;
					height:80px;
					border:1px solid #333;
				}
			}
			.right-info{
				float:left;
				padding:5px 0 0 10px;
				.title{
					padding:0 0 10px 0;
					color:#000;
				}
				.attr{
					padding:0 0 10px 0;
					color:#777;
				}
			}
		}
		.right-gocart{
			width:350px;
			float:right;
			a, .sui-btn{
				display:inline-block;
				height:30px;
				line-height:30px;
				text-decoration:none;
				padding:0 30px;
				border:1px solid #666;
				color:#000;
				background:#ddd;
			}
		}
	}
}


</style>


