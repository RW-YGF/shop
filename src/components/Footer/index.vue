<template>
<div>
<div style="clear:both;"></div>
<footer class="footer">
   <div class="footer_container">
		<dl>
			<dt>购物指南</dt>
			<dd>购物流程</dd>
			<dd>会员介绍</dd>
			<dd>生活旅行/团购</dd>
			<dd>常见问题</dd>
			<dd>购物指南</dd>
		</dl>
		
		<dl>
			<dt>配送方式</dt>
			<dd>上门自提</dd>
			<dd>211限时达</dd>
			<dd>配送服务查询</dd>
			<dd>配送费收取标准</dd>
			<dd>海外配送</dd>
		</dl>
		
		<dl>
			<dt>支付方式</dt>
			<dd>上门自提</dd>
			<dd>211限时达</dd>
			<dd>配送服务查询</dd>
			<dd>配送费收取标准</dd>
			<dd>海外配送</dd>
		</dl>
		
		<dl>
			<dt>售后服务</dt>
			<dd>上门自提</dd>
			<dd>211限时达</dd>
			<dd>配送服务查询</dd>
			<dd>配送费收取标准</dd>
			<dd>海外配送</dd>
		</dl>
		
		<dl>
			<dt>特色服务</dt>
			<dd>上门自提</dd>
			<dd>211限时达</dd>
			<dd>配送服务查询</dd>
			<dd>配送费收取标准</dd>
			<dd>海外配送</dd>
		</dl>
		
   </div>
</footer>
</div>

</template>

<script>
export default {
  name: 'Home',
  
}
</script>

<style scoped lang="less">
.footer{
	width:100%x;
	height:170px;
	background:#eee;
	margin-top:30px;
	padding:30px 0;
}
.footer_container{
	width:1200px;
	margin:0 auto;
}

.footer_container dl{
	width:200px;
	float:left;
	dt{
		font-weight:bolder;
		height:30px;
		line-height:30px;
	}
	dd{
		height:25px;
		line-height:25px;
		text-align:left;
		font-size:14px;
		margin:0;
	}
}

</style>
