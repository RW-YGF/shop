<template>
<div style="width:1200px;margin:0 auto;">
	<div  style="height:60px;">
		<TypeNav/>
	</div>
	<div class="main" style="">
		<div class="py-container">
			<!--  bread 面包屑-->
			<div class="bread" style="clear:both;height:50px;">
				<ul class="f1 sui-breadcrumb" style="">
					<li>
						<a href="#">全部结果 </a>
					</li>
				</ul>
				<ul class="fl sui-tag" style="">
					<!--分类的面包屑 -->
					
					<li class="with-x" v-if="searchParams.categoryName">
						{{searchParams.categoryName}}
						<i @click="removeCategoryName">×</i>
					</li>
					
					<!--关键字的面包屑 -->
					<li class="with-x" v-if="searchParams.keyword">
						{{searchParams.keyword}}
						<i @click="removeKeyword">×</i>
					</li>
					<!--品牌的面包屑 -->
					<li class="with-x" v-if="searchParams.trademark">
						{{searchParams.trademark.split(':')[1]}}
						<i @click="removeTrademark">×</i>
					</li>
					
					<!--售卖的属性 -->
					<li class="with-x" v-for="attr in searchParams.props">
						{{attr.split(':')[1]}}
						<i @click="removeAttr(attr)">×</i>
					</li>
					
					<!--<li class="with-x">华为<i>×</i></li>
					<li class="with-x">oppo<i>×</i></li>-->
				</ul>
			</div>
			
			<!--  selector -->
			<div class="selector">
				<SearchSelector  
					:trademarkList="trademarkList" 
					:attrsList="attrsList"
					@tradeMark="tradeMark"
					@attrSearch="attrSearch"
					/>
			</div>
			
			<!--  details -->
			<div class="details clearfix" style="clear:both;">
				<div class="sui-navbar">
					<div class="navbar-inner filter">
						<ul class="sui-nav">
							<li :class="{active: isOne}"  @click="orderOverall">
								<a>综合<span v-show="isOne">
									<span v-show="overallAsc">↑</span>
									<span v-show="overallDesc">↓</span>
									</span>
								</a>
							</li>
							<li :class="{active: isTwo}"  @click="orderPrice">
								<a>价格<span v-show="isTwo">
									<span v-show="priceAsc">↑</span>
									<span v-show="priceDesc">↓</span>
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!--  details end-->
			
			<!--goods -->
			<div class="good-list">
				<ul class="yui3-g" v-for="(goods, index) in goodsList">
					<li class="yui-u-1-5">
						<div class="list-wrap">
							<div class="p-img">
								<router-link :to="{name:'detail', params:{skuid:goods.id}}">
									<img :src="goods.defaultImg"/>
								</router-link>
							</div>
							<div class="price">
								<strong>
									<em>￥</em>
									<i>{{goods.price}}</i>
								</strong>
							</div>
							<div class="attr">
								<a target="_black" href="item.html" :title="goods.title">
								{{goods.title}}
								</a>
							</div>
							<div class="commit">
								<i class="command">已有<span>2000</span>人评价</i>
							</div>
							<div class="oprate">
								<a class="sui-btn btn-bordered btn-danger" >
								加入购物车
								</a>
								<a href="javascript:void(0);" class="sui-btn btn-bordered">
								收藏
								</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<!--goods end -->
			<Pagination 
				:totalPages="totalPages" 
				:pageSize="pageSize"
				:total="total"
				@changePage="changePage"/>
		</div>
	</div>
</div>  
</template>

<script>
import SearchSelector from './SearchSelector'
import {mapGetters} from 'vuex'

export default {
	name: 'Search',
	data(){
		return {
			//带给服务器的参数
			searchParams : {
				//产品相应的Id 
				category1Id : "",
				category2Id : "",
				category3Id : "",
				//产品的名称
				categoryName : "",
				//搜索关键字
				keyword : "",
				//排序，默认综合降序
				order : "1:desc",
				//第几页
				pageNo : 1,
				//每一页展示条数
				pageSize : 5,
				//平台属性的操作
				props : [],
				//品牌
				trademark : "",
			},
			overallAsc : false,
			overallDesc : true,
			priceAsc : false,
			priceDesc : true,
			overallOrder : 0,
			priceOrder : 0,
			//pageSize : 
			//pageSize : 5,
		};
	},
	components : {SearchSelector },
	computed : {
		...mapGetters(['goodsList', 'trademarkList', 'attrsList', 'totalPages', 'total']),
		isOne(){
			return this.searchParams.order.indexOf('1')!== -1;
		},
		isTwo(){
			return this.searchParams.order.indexOf('2')!== -1;
		},
		pageSize(){
			return this.searchParams.pageSize;
		},
	},
	methods : {
		//向服务器发请求获取search模块，根据参数不同返回的数据进行展示
		getData(){
			Object.assign(this.searchParams, this.$route.params, this.$route.query);
			//console.log('search', this.searchParams);
			this.$store.dispatch('getSearchInfoList', this.searchParams);
		},
		//删除1.2.3级搜索
		removeCategoryName(){
			this.searchParams.categoryName = undefined;
			this.searchParams.category1Id = undefined;
			this.searchParams.category2Id = undefined;
			this.searchParams.category3Id = undefined;
			this.$store.dispatch('getSearchInfoList', this.searchParams);
			if(this.$route.params){
				this.$router.push({name : 'search', params : this.$route.params});
			}
		},
		//删除关键字搜索
		removeKeyword(){
			this.searchParams.keyword = undefined;
			this.$store.dispatch('getSearchInfoList', this.searchParams);
			if(this.$route.query){
				this.$router.push({path : '/search', query : this.$route.query});
			}
			//通知兄弟组件Header清除关键字
			this.$bus.$emit("clear");
		},
		//品牌搜索
		tradeMark(value){
			this.searchParams.trademark = value.tmId+':'+value.tmName;
			//console.log(this.searchParams.trademark);
			this.$store.dispatch('getSearchInfoList', this.searchParams);
		},
		//删除品牌面包屑
		removeTrademark(){
			this.searchParams.trademark = undefined;
			this.$store.dispatch('getSearchInfoList', this.searchParams);
		},
		//添加品牌售卖搜索
		attrSearch(attrId, item, attrName){
			let attr = attrId+':'+attrName+':'+item;
			let obj = this.searchParams.props.find((item)=> item == attr);
			if(obj === undefined){
				this.searchParams.props.unshift(attrId+':'+attrName+':'+item);
				//console.log(this.searchParams.props);
				this.$store.dispatch('getSearchInfoList', this.searchParams);
			}
		},
		//删除品牌售卖搜索
		removeAttr(attr){
			this.searchParams.props = this.searchParams.props.filter((item)=> item !==attr);
			this.$store.dispatch('getSearchInfoList', this.searchParams);
		},
		//综合排序
		orderOverall(){
			console.log(this.overallOrder);
			//第一次点击综合
			if(this.overallOrder === 0 && this.priceOrder!== 0){
				this.searchParams.order = "1:desc";
				++this.overallOrder;
				this.$store.dispatch('getSearchInfoList', this.searchParams);
				return;
			}
			//箭头的变化
			this.overallAsc = !this.overallAsc;
			this.overallDesc = !this.overallDesc;
			//升序
			if(this.overallAsc){
				this.searchParams.order = "1:asc";
			}
			//降序
			if(this.overallDesc){
				this.searchParams.order = "1:desc";
			}
			this.$store.dispatch('getSearchInfoList', this.searchParams);
		},
		//价格排序
		orderPrice(){
			//第一次点击
			if(this.priceOrder === 0){
				this.searchParams.order = "2:desc";
				++this.priceOrder;
				this.$store.dispatch('getSearchInfoList', this.searchParams);
				return;
			}
			
			//箭头的变化
			this.priceAsc = !this.priceAsc;
			this.priceDesc = !this.priceDesc;
			//升序
			if(this.priceAsc){
				this.searchParams.order = "2:asc";
			}
			//降序
			if(this.priceDesc){
				this.searchParams.order = "2:desc";
			}
			this.$store.dispatch('getSearchInfoList', this.searchParams);
		},
		//
		changePage(page){
			this.searchParams.pageNo = page;
			this.$store.dispatch('getSearchInfoList', this.searchParams);
		}
	},
	watch : {
		//'$route': 'getData',
		'$route' : {
			handler(newValue, oldValue){
				this.getData();
				//每一次请求完毕，应该把相应的1,2,3级分类置空，让他接收下一次的各级ID
				this.searchParams.category1Id = undefined;
				this.searchParams.category2Id = undefined
				this.searchParams.category3Id = undefined;
			},
			//immediate: true,
		},
		/*
		$route(newValue, oldValue){
			this.getData();
			//每一次请求完毕，应该把相应的1,2,3级分类置空，让他接收下一次的各级ID
			this.searchParams.category1Id = undefined;
			this.searchParams.category2Id = undefined
			this.searchParams.category3Id = undefined;
		},
		*/
	},
	beforeMount(){
		//合并对象
		//Object.assign(this.searchParams, this.$route.params, this.$route.query);
	},
	mounted(){
		this.getData();
	}
	
}
</script>

<style scoped lang="less">
body *{
margin:0;
padding:0;
}
.bread{
	.sui-breadcrumb{
		height:40px;
		float:left;
		li{
			display:inline;
			padding: 0  10px;
			a{
				height:40px;
				line-height:40px;
				margin:0 0 10px 0;
			}
		}
	}
	.sui-tag{
		float:left;
		height:40px;
		margin-left:10px;
		li{
			display:inline-block;
			border:1px solid black;
			margin:5px 5px 0 5px;
			padding:4px 4px;
			font-size:14px;
			background:#eee;
			i{
				margin: 0 5px 0 5px;
				font-style:normal;
				cursor:pointer;
			}
		}
	}
}

.selector{
	clear:both;
}

.details{
	width:100%;
	border:1px solid #333;
	background:#eee;
	a{
		cursor:pointer;
	}
}
.sui-nav{
	li{
		height:45px;
		line-height:45px;
		text-align:center;
		display:inline-block;
		width:80px;
		background:#eee;
		a{
			text-decoration: none;
			color:#333;
		}
	}
	li.active{
		background:orange;
		a{
			color:#fff;
		}
	}
	
}

.yui3-g{
	.yui-u-1-5{
		padding:0 20px 0 0;
	}
	width:19.8%;
	display:inline-block;
	margin-bottom:20px;
	.yui-u-1-5{
		list-style:none;
		.p-img{
			width:100%;
			height:200px;
			img{
				width:200px;
				height:200px;
				}
		}
	}
	.price{
		height:30px;
		line-height:30px;
		color:red;
		i, em{
			font-style:normal;
			font-size:20px;
		}
	}
	.attr{
		height:80px;
		a{
			text-decoration: none;
			text-align:center;
		}
	}
	.commit{
		color:#333;
		.command{
			font-style:normal;
			span{
				color:#000;
				font-weight:bolder;
			}
		}
	}
	
	.oprate{
		margin:10px 0;
		.sui-btn{
			border:1px solid #333;
			padding:5px  20px;
			font-size:12px;
			color:#333;
			float:right;
		}
		.btn-danger{
			color:red;
			padding:5px; 
			float:left;
		}
	}
	
}

</style>
