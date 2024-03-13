<template>
<!-- ListContainer  -->
	<div class="list-container" 
		style="width:850px;float:left;">
	
		<div class="sortList clearfix">
			<div class="center" style="float:left">
				<!-- banner轮播  --->
				
				<div class="swiper-container" id="mySwiper"
					style="">
					<div class="swiper-wrapper">
						<div class="swiper-slide" 
						v-for="(carousel, index) in banners">
							<img :src="carousel.imgUrl" :key="carousel.id"/>
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
			</div>
			
			<div class="right" 
			style="float:left;width:230px;margin-left:10px;">
				<div class="news">
					<h4>
						<em class="f1">XXX快报</em>
						<span class="fr tip">更多 》</span>
					</h4>
					
					<div class="clearix"></div>
					<ul class="news-list unstyled">
					<li><span class="bold">[特惠]</span>备战开学 全民半价</li>
					<li><span class="bold">[特惠]</span>备战开学 全民半价</li>
					<li><span class="bold">[特惠]</span>备战开学 全民半价</li>
					<li><span class="bold">[特惠]</span>备战开学 全民半价</li>
					</ul>	
				</div>
				
				<ul class="lifeservices">
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">花费</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">机票</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">电影票</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">游戏</span>
					</li>
				</ul>
			</div>	
		</div>
	
		
		
	</div>
</template>

<script>
import  {mapState} from 'vuex'
import Swiper from 'swiper'
export default {
	name: 'ListContainer',
	data(){
		return {
			//banners : [],
		}
	},
	computed : {
		...mapState({
				banners :(state) => state.home.banner,
		}),
		
	},
	watch : {
		banners : {
			handler(newValue, oldValue){
			this.$nextTick(()=>{
			/******轮播图*********/
			
			//carousel
				new Swiper ('.swiper-container', {
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
    
				});
			/***************/
			});
			},
			//其他配置
		},
	},
	
	mounted(){
		if(this.banners.length === 0){
			this.$store.dispatch('getBannerList');
		}
		
			/***************/
			//carousel
		let mySwiper = new Swiper ('.swiper-container', {
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
    
    // 如果需要滚动条
   // scrollbar: {
   //   el: '.swiper-scrollbar',
   // },
  })   
			/***************/
		
		//轮播图
		
		
		
		
	},
	
}
</script>

<style scoped lang='less'>
.swiper-container{
	width:600px;
}
.swiper-slide img{
width:600px;
height:350px;
}
.unstyled{
	list-style:none;
}


</style>
