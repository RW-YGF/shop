<template>
<!-- banner轮播  --->

				<div class="swiper-container" id="mySwiper">
					<div class="swiper-wrapper">
					<!--
						<div class="swiper-slide" 
						v-for="(carousel, index) in banners">
							<img :src="carousel.imgUrl" :key="carousel.id"/>
						</div>
					-->
						<div class="swiper-slide" >
							<img src="./images/a1.jpg"/>
						</div>
						<div class="swiper-slide" >
							<img src="./images/a2.jpg"/>
						</div>
						<div class="swiper-slide" >
							<img src="./images/banner1.jpg"/>
						</div>
					</div>
					
					<!-- 如果需要分页器 -->
					<div class="swiper-pagination"></div>
					
					<!-- 如果需要导航按钮 -->
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
					
					<!-- 如果需要滚动条 -->
					<div class="swiper-scrollbar"></div>
				</div>

<!-- banner轮播  --->
</template>

<script>
import Swiper from 'swiper'
export default {
	name: 'Swiper',
	mounted(){
		new Swiper('.swiper-container', {
				//direction: 'vertical', // 垂直切换选项
				loop: true, // 循环模式选项
    
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
    
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				//同时展示几张图，默然一张
				//slidesPerView:1,
    
		});
	}
	
}

</script>

<style scoped lang='less'>


</style>