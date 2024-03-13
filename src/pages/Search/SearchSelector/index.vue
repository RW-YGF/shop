<template>
<div class="clearfix selector" style="float:left;">
	<div class="type-wrap logo">
		<div class="fl key brand">品牌</div>
		<div class="value logos">
			<ul>
				<li v-for="(tm, index) in trademarkList" 
				:key=tm.tmId 
				@click="tradeMarkHandler(tm)">
				{{tm.tmName}}</li>
				<!--<li>大米</li><li>大米</li><li>大米</li><li>大米</li><li>大米</li>
				<li>大米</li><li>大米</li><li>大米</li><li>大米</li><li>大米</li><li>大米</li>
				<li>大米</li><li>大米</li><li>大米</li><li>大米</li><li>大米</li><li>大米</li>
				-->
			</ul>
		</div>
		<div class="ext">
			<a href="javascript::void(0);" class="sui-btn">多选</a>
			<a href="javascript::void(0);">更多</a>
		</div>
	</div>
	
	
	<div class="type-wrap" style="clear:both;" v-for="(attr, index) in attrsList"
		:key="attr.attrId">
		<div class="fl key">{{attr.attrName}}</div>
		<div class="value" style="width:1000px;">
			<ul class="type-list">
				<li v-for="item in attr.attrValueList">
					<a @click="attrHandler(attr.attrId, item, attr.attrName)">{{item}}</a>
				</li>
			</ul>
		</div>
	</div>
	
	
</div>  
</template>

<script>
export default {
	name: 'SearchSelector',
	props : ["trademarkList", "attrsList" ],
	methods: {
		//品牌的事件处理函数
		tradeMarkHandler(tm){
			//console.log(e.target.innerHTML);
			this.$emit('tradeMark', tm);
		},
		//属性值处理函数
		attrHandler(attrId, attrName, item){
			//console.log(item, attrName);
			this.$emit('attrSearch', attrId, item, attrName);
		},
		totalPages(){
		
		},
	},
	mounted(){
		//console.log("attrsList", this.attrsList);
		
	},
}
</script>

<style scoped lang="less">
body *{
	margin:0;
	padding:0;
}
.clearfix::after{
	content: "";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}
.selector{
	width:100%;
	border:1px solid #333;
	margin-bottom:20px;
	
}
.type-wrap{
	width:100%;
	float:left;
	border-top:1px solid #333;
}
.fl{
	text-align:right;
	float:left;
	width:70px;
	background:#ccc;
	height:40px;
	padding:20px 10px 0 0;
}
.value{
	float:left;
	background:#fff;
	ul {
		width:900px;
		li{
			border:1px solid #333;
			display:inline-block;
			padding:0 15px;
			height:30px;
			line-height:30px;
			margin:5px 0;
			text-align:center;
		}
	}
}
.logos{
	width:1100px;
	padding:5px 10px;
	
}
.logo{
	position: relative;
	background:#ccc;
}
.ext{
	background:#fff;
	position: absolute;
	top:10px;
	right: 10px;
	display:inline-block;
	a{
		text-decoration:none;
		margin:0 10px 0 0;
		padding: 2px 5px;
		color:#333;
		font-size:12px;
	}
	.sui-btn{
		border:1px solid #333;
	}
}
ul.type-list{
	li{
		border:none;
	}
}

</style>
