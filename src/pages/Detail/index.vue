<template>
<div>
<!-- 商品分类导航 -->
	<TypeNav />
<!-- 主要内容区域 -->
	<section class="on">
		<!-- 导航路径区域 -->
		<div class="conPoin">
			<span v-show="categoryView.category1Id">{{categoryView.category1Name}} /</span>
			<span v-show="categoryView.category2Id">{{categoryView.category2Name}} /</span>
			<span v-show="categoryView.category3Id">{{categoryView.category3Name}}</span>
			
		</div>
		<!-- 主要内容区域 -->
		<div class="mainCon" 
		style="width:1200px;float:left;">
			<!-- 左侧放大镜区域 -->
			<div class="previewWrap" 
			style="width:420px;padding:0px 0 20px 0;float:left;">
				<!-- 放大镜效果 -->
				<Zoom 
					:skuDefaultImg="skuInfo.skuDefaultImg"
					:skuImageList="skuImageList"
					/>
				<!-- 小图列表 -->
				<ImageList :skuImageList="skuImageList"/>
			</div>
			<!-- 右侧选择区域布局 -->
			<div class="InfoWrap"
			style="width:670px;height:400px;border:1px solid pink;float:left; margin-left:50px;">
				<div class="goodsDetail">
					<h3 class="infoName">{{skuInfo.skuName}}</h3>
					<p class="news">{{skuInfo.skuDesc}}</p>
					<div class="priceArea" style="background:pink;padding:20px 5px;">
						<div class="priceArea1">
							<div class="title">
							价&nbsp;&nbsp;格 : </div>
							<div class="price">
								<i>￥</i>
								<em>{{skuInfo.price}}</em>
								<span> 降价通知</span>
							</div>
						</div>
					</div>
					
					<div class="choose" style="margin:15px 0 0 0;">
						<div class="chooseArea"> 
							<div class="choosed"></div>
							<dl v-for="(spuSaleAttr, index) in spuSaleAttrList" :key="spuSaleAttr.id">
								<dt class="title">{{spuSaleAttr.saleAttrName}}</dt>
								<dd changeprice="0" 
								v-for="(attrValue, index) in spuSaleAttr.spuSaleAttrValueList"
								:class="{active:parseInt(attrValue.isChecked)}"
								:key="attrValue.id"
								@click="attrCheck(spuSaleAttr.spuSaleAttrValueList, attrValue.id)"
								>
								{{attrValue.saleAttrValueName}}
								</dd>
							</dl>
						</div>
						
						<div class="carWrap" style="float:left;margin-top:10px;">
							<div class="controls" 
							style="float:left;width:68px;">
								<input autocomplete="off" class="itxt" v-model="skuNum"
								@change="changeSkuNum"/>
								<a href="javescript:" class="plus" @click="plus">+</a>
								<a href="javescript:" class="mins" @click="mins">-</a>
							</div>
							
							<div class="add" 
							style="width:200px;margin-left:10px;float:left;">
								<a @click="addCart">加入购物车</a>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
<!-- 内容详情页 -->
<!--
	<section class="product-detail"
	style="border:1px solid red;width:1200px;clear:both;">
		内容详情页
		<aside class="aside">aside</aside>
		<div class="detail">detail</div>
	</section>
-->
</div>
</template>

<script>
//http://gmall-h5-api.atguigu.cn/api/item/13
import {mapState, mapGetters} from 'vuex'
import Zoom from './Zoom'
import ImageList from './ImageList'

export default {
	name: 'Detail',
	components : {
		Zoom, 
		ImageList,
	},
	data(){
		return {
			skuNum : 1,
		};
	},
	computed : {
		...mapState({goodInfo:(state)=> state.detail.goodInfo}),
		...mapGetters(['categoryView', 'spuSaleAttrList', 'skuInfo']),
		skuImageList(){
			return this.skuInfo.skuImageList || [];
		},
	},
	methods : {
		//售卖属性选择高亮
		attrCheck(spuSaleAttrValueList, id){
			//console.log(spuSaleAttrValueList.length, id);
			spuSaleAttrValueList.forEach((item)=>{
				//console.log(item.saleAttrValueName);
				item.isChecked = '0';
				if(item.id === id){
					item.isChecked = '1';
				}
			});
		},
		//购物车数量加一
		plus(){
			++this.skuNum;
		},
		//购物车数量减一
		mins(){
			if(this.skuNum ==1){
				this.skuNum = 1;
			}else{
				--this.skuNum;
			}
		},
		//输入购物车数量变化
		changeSkuNum(){
			let value = event.target.value*1;
			if(isNaN(value)){
			//包含字符，不是数字
				this.skuNum = 1;
			}else{
				//小数
				if(!Number.isInteger(value)){
					this.skuNum = parseInt(value);
				}
			}
			if(value<1){
				this.skuNum = 1;
			}
		},
		//加入购物车
		async addCart(){
			//console.log(this.$route.params.skuid, this.skuNum);
			let skuNum = this.skuNum;
			try{
			//成功
				await this.$store.dispatch('addOrUpdateShopCart', {
					skuid : this.$route.params.skuid,
					skuNum : this.skuNum,
				});
				//简单的信息通过路由传递。复杂的信息通过会话存储
				//会话存储或者本地存储不能存对象
				sessionStorage.setItem("SKUINFO", JSON.stringify(this.skuInfo));
				//路由跳转
				this.$router.push({
					name : 'addCartSuccess',
					params : {
						//skuid : this.$route.params.skuid,
						sknum : this.skuNum,
					}
				});
				
			}catch(error){
				alert(error.message);
			}
		},
	},
	mounted(){
		//获取产品详情信息
		this.$store.dispatch('getDetails', this.$route.params.skuid);
	},
}
</script>

<style scoped lang="less">
body *{
	padding:0px;
	margin:0px;
}
.on{
	width:1200px;
	clear:both;
	.conPoin{
		height:30px;
		line-height:30px;
	}
	
}
.infoName{
	height:40px;
	line-height:40px;
}
.news{
	margin:20px 0;
	color:red;
}
.title{
display:inline-block;
margin-right:5px;
}
.price{
display:inline-block;
	i{
		font-style:normal;
	}
	em{
		font-style:normal;
		color:red;
		font-size:30px;
		font-weight:bolder;
	}
	span{
		color:red;
	}
}

.chooseArea{
	margin-bottom: 10px;
	dl{
		dt{
			display:inline-block;
			padding: 10px;
		}
		dd{
			display:inline-block;
			border:1px solid #333;
			height:30px;
			line-height:30px;
			padding:0 10px;
			margin:0 10px;
			
		}
		.active{
			color:green;
		}
	}
	
}
.itxt{
height:41px; 
width:45px;
float:left;
border:1px solid #333;
text-align:center;
}
.plus, .mins{
height:20px;
width:18px;
border:1px solid #333;
border-left:none;
display:inline-block;
float:left;
text-decoration:none;
text-align:center;color:#333;
background:#eee;
}
.mins{
border-top:none;
}
.add a{
display:inline-block;
height:40px;
line-height:40px;
width:120px;
text-align:center;
text-decoration:none;
color:#fff;
background:red;
}
</style>
