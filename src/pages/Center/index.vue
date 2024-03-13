<template>
<div class="order-main" style="width:1200px;margin:0 auto;clear:both;">
	<div class="container" style="float:left;">
		<div class="order-body">
			<!-- 左侧列表 -->
			<div class="order-left" style="">
				<dl>
					<dt><i>:</i>订单中心</dt>
					<dd>
						<router-link to="/center/myOrder">我的订单</router-link>
					</dd>
					<dd>
						<router-link to="/center/groupOrder">团购订单</router-link>
					</dd>
					<dd>本地生活订单</dd>
					<dd>我的预售</dd>
					<dd>评价晒单</dd>
				</dl>
				
				<dl>
					<dt><i>:</i>关注中心</dt>
					<dd>关注的商品</dd>
					<dd>关注的店铺</dd>
					<dd>关注的专辑</dd>
					<dd>关注的品牌</dd>
				</dl>
				
				<dl>
					<dt><i>:</i>关注中心</dt>
					<dd>关注的商品</dd>
					<dd>关注的店铺</dd>
					<dd>关注的专辑</dd>
					<dd>关注的品牌</dd>
				</dl>
				
				<dl>
					<dt><i>:</i>关注中心</dt>
					<dd>关注的商品</dd>
					<dd>关注的店铺</dd>
					<dd>关注的专辑</dd>
					<dd>关注的品牌</dd>
				</dl>
			</div>
			
			<!-- 右侧列表 --->
			<router-view></router-view>
		</div>
	</div>
</div>
</template>

<script>

export default {
	name: 'center',
}
</script>

<style scoped lang="less">
body *{
	margin:0;
	padding:0;
}

.order-left{
	width:200px;
	float:left;
	dl{
		margin-bottom:20px;
		dt{
			height:35px;
			line-height:35px;
			font-weight:bolder;
			i{
				font-style:normal;
			}
		}
		dd{
			height:35px;
			line-height:35px;
			text-align:center;
			border-bottom:1px solid #bbb;
			cursor:pointer;
			a{
				text-decoration:none;
				color:#000;
			}
		}
	}
}
</style>


