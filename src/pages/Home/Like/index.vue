<template>
<!-- Like  -->
	<div class="today-Like">
		<span>猜你喜欢</span>
		<span>优质好货</span>
		<span>品牌尾货</span>
		<span>时尚穿搭</span>
		<span>0点上新</span>
		
	</div>
</template>

<script>
export default {
	name: 'Like',
	
	
}
</script>

<style scoped lang="less">
.today-Like{
	float:left;
	width:100%;
	height:150px;
	line-height:150px;
	text-align:center;
	border:1px solid #ccc;
	span{
		display:inline-block;
		height:150px;
		width:19.9%;
		background:#eee;
		border-right:1px solid #ddd;
	}
}

</style>
