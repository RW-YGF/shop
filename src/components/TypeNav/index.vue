<template>
	<div class="type-nav" style="float:left;">
		<div class="container" 
		@mouseenter="enterShow" @mouseleave="enterHidden"
		>
			<!-- <h2 style="margin:15px;">全部商品分类</h2>  -->
			
			<div  @click="goSearch" v-show="showNav" style="position:relative;">
				<div v-for="(c1, index) in categoryList" class="container-nav">
					<p  style="height:30px;margin:0;"
					@mouseenter="changeIndex(index)"
					@mouseleave="leaveIndex(index)"
					:key="c1.categoryId"  
					:class="{cur: currentIndex==index,
							categoryList0:currentIndex!==index}"
					>
						<a :categoryName="c1.categoryName"
							:category1Id="c1.categoryId">
						{{c1.categoryName}}
						</a>
					</p>
					<div  class="second-nav"
						v-for="c2 in c1.categoryChild"	:key="c2.categoryId">
						<dl>
							<dt>
								<a :categoryName="c2.categoryName"
									:category2Id="c2.categoryId">
								{{c2.categoryName}}
								</a>
							</dt>
							<dd style="border:1px solid white;
								display:inline;margin:0 2px;"
								v-for="c3 in c2.categoryChild" 
								:key="c3.categoryId">
								<a :categoryName="c3.categoryName"
									:category3Id="c3.categoryId">
								{{c3.categoryName}}
								</a>
							</dd>
						</dl>
					</div>
				</div>
			</div>
			
		</div>
		<!--
		<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">生活超市</a>
				<a href="###">全球购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
		</nav>
		-->
	</div>
</template>

<script>
//import  {reqCategoryList} from '@/api'
import  {mapState} from 'vuex'
import throttle from 'lodash/throttle'

export default {
	name: 'TypeNav',
	data(){
		return {
			currentIndex : -1,
			showNav : true,
		};
	},
	computed:{
		...mapState({
			categoryList :(state) => state.home.categoryList,
		}),
		
	},
	methods : {
		//一级分类鼠标进入,节流，这里不能用箭头函数
		changeIndex : throttle(function(index){
			this.currentIndex = index;
			//console.log(this.currentIndex);
		}, 1000),
		//一级分类鼠标移除
		leaveIndex(){
			this.currentIndex = -1;
		},
		//进行路由跳转
		goSearch(e){
			
			let element = e.target;
			if(element.localName === 'a'){
				let query = {
					categoryName : element.getAttribute('categoryName'),
				};
				if(element.getAttribute('category1Id')){
					query.category1Id = element.getAttribute('category1Id');
				}else if(element.getAttribute('category2Id')){
					query.category2Id = element.getAttribute('category2Id');
				}else{
					query.category3Id = element.getAttribute('category3Id');
				}
				let local = {name : 'search', query};
				if(JSON.stringify(this.$route.params) !== '{}'){
					local.params = this.$route.params;
				}
				
				this.$router.push(local);
				
			}
		},
		//鼠标移入的时候，商品列表显示
		enterShow(){
			if(this.$route.path !== '/home'){
				this.showNav = true;
			}
		},
		//鼠标移除的时候，商品列表隐藏
		enterHidden(){
			if(this.$route.path !== '/home'){
				this.showNav = false;
			}
		},
	},
	mounted(){
		//页面切换的时候，避免重复发请求
		if(this.categoryList.length === 0){
			this.$store.dispatch('getCategoryList');
		}
		//商品列表显示于隐藏
		if(this.$route.path !== '/home'){
			this.showNav = false;
		}
	}
}
</script>

<style scoped>
.nav{
	float:left;
}
.nav a{
	height:30px;
	line-height:30px;
	padding:5px 10px;
	display:inline-block;
	border:1px solid green;
}
.cur a{
	color:pink;
	font-size:20px;
}
.categoryList0 a{
	font-size:20px;
	color:green;
}

.container{
	width:250px;
	float:left;
	padding:0;
}
.container-nav:hover .second-nav{
display:block;
}

.second-nav{
display:none;
width:596px;
height:500px;
z-index:5;
position:absolute;
top:0;
left:250px;
background:#fff;
border:1px solid black;
}


</style>
