<template>
<div >
	<div class="spec-preview"
	style="width:100%;height:450px;background:pink;position:relative;"
	@mouseleave="hidden">
		<img :src="imgObj.imgUrl" class="small" style="width:400px;height:430px;"/>
		<div class="event" @mousemove="handle"></div>
		<div class="big" v-show="imgShow"
			style="">
			<img :src="imgObj.imgUrl" ref="big"/>
		</div>
		<!-- 遮罩层 -->
		<div class="mask" ref="mask" v-show="maskShow"></div>
	</div>
</div>
</template>

<script>
//skuDefaultImg
export default {
	name: 'Zoom',
	props : ['skuDefaultImg', 'skuImageList'],
	data(){
		return {
			index : 0,
			imgShow : 0,
			maskShow : 0,
		};
	},
	computed :{
		//避免返回空数组
		imgObj(){
			return this.skuImageList[this.index] || {};
		},
		
	},
	methods : {
		hidden(){
			this.imgShow = 0;
			this.maskShow = 0;
		},
		//放大镜事件
		handle(){
			this.imgShow = 1;
			this.maskShow = 1;
			let mask = this.$refs.mask;
			let left = event.offsetX - mask.offsetWidth/2;
			if(left <0){
				left=0;
			}
			if(left>=  (420-mask.offsetWidth)){
				left = 420-mask.offsetWidth;
			}
			
			let top = event.offsetY - mask.offsetHeight/2;
			if(top <0){
				top=0;
			}
			if(top>=  (450-mask.offsetHeight)){
				top = 450-mask.offsetHeight;
			}
			mask.style.left = left+'px';
			mask.style.top = top+'px';
			
			let big =  this.$refs.big;
			big.style.left = -2*left+'px';
			big.style.top = -2*top+'px';
		}
	},
	mounted(){
		//获取zoom组件传来的图片index，并修改大图
		this.$bus.$on('imgIndex', (index)=>{
			this.index = index;
		});
	},
}

</script>

<style scoped lang="less">
.event{
	position:absolute;
	top:0;
	left:0px;
	width:470px;
	height:450px;
}
.mask{
	position:absolute;
	left:0;
	top:0;
	width:150px;
	height:150px;
	background:green;
	opacity:0.3;
	display:block;
}
.big{
	position:absolute;
	top:0;
	left:420px;
	width:470px;
	height:500px;
	border:2px solid #ddd;
	overflow:hidden;
	background:#fff;
	img{
		position:absolute;
		top:0px;
		left:0px;
	}
}
</style>