<template>
<!--
<div style="height:120px;border:3px solid black;">
	<div style="background:orange;padding:5px;width:1000px;">
		<img  v-for="img in skuImageList" :src="img.imgUrl" 
		style="height:90px; width:450px;margin:5px;border:1px solid red;display:inline-block;" />  
	</div>
</div>
-->
<div class="swiper-container" ref="cur"
	style="height:120px;width:400px;padding:0 10px;position:relative;">
				<div class="swiper-wrapper" >
						<div class="swiper-slide"
						v-for="(item, index) in skuImageList" :key="item.id">
							<img :src="item.imgUrl" 
							:class="{active: currentIndex===index}"
							@click="changeImg(index, item.imgUrl)"
							/>
						</div>
						
				</div>
					<!-- 如果需要导航按钮 -->
					<div class="swiper-button-prev"
					style="position:absolute;left:0px;width:10px;"
					></div>
					<div class="swiper-button-next"
					style="position:absolute;right:0px;width:10px;"
					></div>
				</div>
				
</template>

<script>
import Swiper from "swiper"
//display:flex;overflow:auto;
export default {
	name: 'ImageList',
	props : ['skuImageList'],
	data(){
		return {
			currentIndex : 0,
		};
	},
	watch : {
		skuImageList(newValue, oldValue){
			this.$nextTick(()=>{
				new Swiper('.swiper-container', {
					// 如果需要前进后退按钮
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					slidesPerView: 3,
					//一次滚动图片的个数
					slidesPerGroup : 1,
				});
				
			});
		},
	},
	methods : {
		//图片选中高亮
		changeImg(index){
			this.currentIndex = index;
			this.$bus.$emit('imgIndex', index);
		}
	},
	mounted(){	
		
	},
}

</script>

<style scoped lang='less'>
.swiper-slide{
	img{
		height:90px;
		width:90px;
		margin:4px;
		cursor:pointer;
		border:1px solid #333;
	}
	img.active{
			border:2px solid red;
		}
}

</style>