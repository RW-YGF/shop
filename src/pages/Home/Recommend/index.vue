<template>
<!-- Recommend  -->
	<div class="today-recommend" style="">
		<span>今日推荐</span>
		<span>优质好货</span>
		<span>品牌尾货</span>
		<span>时尚穿搭</span>
		<span>0点上新</span>
	</div>
</template>

<script>
export default {
	name: 'Recommend',
	
	
}
</script>

<style scoped lang="less">
.today-recommend{
	float:left;
	width:100%;
	height:150px;
	border:1px solid #ccc;
	span{
		display:inline-block;
		height:150px;
		line-height:150px;
		width:19.9%;
		text-align:center;
		background:#eee;
		border-right:1px solid #ddd;
	}
}

</style>
