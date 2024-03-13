<template>
<div style="width:1200px;border:1px solid #bbb;margin:0 auto;">
	<div style="" class="succ_title">
	恭喜您，支付成功！</div>
	<div  class="succ_btn" style="">
		<span style="background:red;color:#fff;border:1px solid red;"
		@click="$router.push('/center')">查看详情</span>
		<span style="background:#ccc;color:#000;border:1px solid #bbb;margin-right:0;" @click="$router.push('/home')">继续购物</span>
	</div>
</div>
</template>

<script>
export default {
	name: 'paySuccess',
}
</script>

<style scoped lang="less">
body *{
	margin:0;
	padding:0;
}
.succ_title{
	width:240px;
	color:green;
	font-size:22px;
	font-weight:bolder;
	margin:80px auto 50px auto;
}

.succ_btn{
	width:270px; 
	margin:10px auto 50px auto;
	span{
		width:120px;
		display:inline-block;
		height:40px;
		line-height:40px;
		text-align:center;
		margin-right:20px;
		letter-spacing:2px;
		cursor:pointer;
	}
}
</style>


