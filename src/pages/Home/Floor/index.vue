<template>
<!-- Like  -->
	<div class="floor">
		<div class="py-container">
			<div class="title clearfix">
				<h3 class="fl">{{floor.name}}</h3>
				<!-- 抬头右边链接 -->
				<ul class="nav-tabs clearfix">
					<li class="active" v-for="(nav, index) in floor.navList">
						<a :href="nav.url" data-toggle="tab">{{nav.text}}</a>
					</li>
					<!--
					<li class="active">
						<a href="#" data-toggle="tab">热门22</a>
					</li>
					-->
				</ul>
			</div>
		</div>
		
		<div class="tab-content" style="border:1px solid #ccc;">
			<div class="tab-pane">
				<div class="floor-1" style="clear:both;margin:0;padding:0;">
					<div class="blockgary" >
						<ul class="jd-list">
							<li v-for="(word, index) in floor.keywords">{{word}}</li>
						</ul>
						<img src="./images/floor-1-1.jpg" 
						style="" />
					</div>
					
					<div　class="floorBnner">
						<div>
							<!-- carousel  -->
							<div class="swiper-container" id="mySwiper"">
								<div class="swiper-wrapper">
									<div class="swiper-slide" 
										v-for="(carousel, index) in floor.carouseList">
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
							<!-- carousel  -->
						</div>
					</div> <!--floorBnner -->
					
					<div class="split" style="width:210px;height:300px;
						float:left;">
						<span class="fkoor-x-line"></span>
						<div class="floor-conver-pit">
							<img :src="floor.recommentList[0]" style="width:205px;height:150px;"/>
						</div>
						<div class="floor-conver-pit">
							<img :src="floor.recommentList[1]"  style="width:235px;height:150px;"/>
						</div>
					</div>
					
					<div class="splite center" style="float:left;">
						<img :src="floor.bigImg"  style="width:210px;height:300px;"/>
					</div>
					
					<div class="split">
						<span class="fkoor-x-line"></span>
						<div class="floor-conver-pit">
							<img :src="floor.recommentList[2]"  style="width:210px;height:150px;"/>
						</div>
						<div class="floor-conver-pit">
							<img :src="floor.recommentList[3]"  style="width:210px;height:150px;"/>
						</div>
					</div>
					
					</div>
					
				</div>
			</div>
		
		</div>
		
	</div>
</template>

<script>

import Swiper from 'swiper'
export default {
	name: 'Floor',
	props : ['floor'],
	mounted(){
		//console.log('floor', this.floor);
		
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
	}
	
}
</script>

<style scoped lang="less">
body *{
	padding:0px;
	margin:0px;
}
.floor{
	height:350px;
	width:1200px;
	float:left;
	margin-top:10px;
}
.fl{
	text-indent:20px;
	color:red;
}
.title{
	height:40px;
	line-height:40px;
	width:100%;
	border:1px solid #ccc;
	.fl{
		float:left;
	}
	.nav-tabs{
		float:right;
		padding-right:20px;
		.active{
			display:inline-block;
			margin:10px  0 0 0px;
			padding:0 10px;
			height:20px;
			line-height:20px;
			float:left;
			border-right:1px solid #ccc;
		}
		.active:last-child{
			border-right:none;
		}
	}
}
.blockgary{
	float:left;
	.jd-list{
			
			width:200px;
			height:75px;
			list-style:none;
			float:left;
			background:#ccc;
		li{
			height:25px;
			line-height:25px;
			width:100px;
			diaplay:inline-block;
			font-size:15px;
			float:left;
			text-indent:3px;
		}
		
	}
	img{
		width:200px;
		height:200px;
		display:block;
		clear:both;
		padding-top:10px;
		
	}
}

.floorBnner{
	width:300px;
	height:300px;
	margin:0 10px 0 5px;
	
	float:left;
}


.swiper-slide img{
width:300px;
height:280px;
}


</style>
