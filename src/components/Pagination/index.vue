<template>
<div class="page">
				<div class="sui-pagination clearfix">
					<ul v-show="realPage === totalPages">
						<li class="prev disabled" v-show="pageNo!=1">
							<a @click="prevPage()"><<上一页</a>
						</li>
						
						<li v-for="page in realPage" 
							:class="{active : page=== pageNo}">
							<a @click="changePage(page)">{{page}}</a>
						</li>

						<li class="next"  v-show="pageNo!=totalPages">
							<a @click="nextPage">下一页>></a>
						</li>
						<li class="total">
							<a @click="nextPage">共{{total}}条</a>
						</li>
					</ul>
					<!-- 页数多余指定数量   -->
					<ul v-show="realPage !== totalPages">
						<li class="prev disabled" v-show="pageNo!=1">
							<a @click="prevPage()"><<上一页</a>
						</li>
						<li :class="{active : 1=== pageNo}">
							<a @click="changePage(1)">1</a>
						</li>
						<li :class="{active : 2=== pageNo}">
							<a @click="changePage(2)">2</a>
						</li>
						<!-- -->
						<li v-show="pageNo>continues+3" class="dotted">
							<span>...</span>
						</li>
						<!-- 展示的页面 -->
						<li v-for="page in dottPage" 
							:class="{active : page=== pageNo}">
							<a @click="changePage(page)">{{page}}</a>
						</li>
						<!-- -->
						<li v-show="pageNo<totalPages-continues-1"  class="dotted">
							<span>...</span>
						</li>
						<li :class="{active : totalPages=== pageNo}">
							<a @click="changePage(totalPages)">{{totalPages}}</a>
						</li>
						<li class="next"  v-show="pageNo!=totalPages">
							<a @click="nextPage">下一页>></a>
						</li>
						<li class="total">
							<a @click="nextPage">共{{total}}条</a>
						</li>
					</ul>
					
				</div>
			</div>
</template>

<script>
export default {
  name: 'Pagination',
  props : ['totalPages', 'total'],
  data(){
	return {
		pageNo : 1,
		continues : 2,
		pageSize : 5,
	}
  },
  computed : {
	//最少的页数
	lastPage(){
		return 2*this.continues + 3;
	},
	//实际的页数
	realPage(){
		return  this.totalPages>this.lastPage ? this.lastPage : this.totalPages;
	},
	dottPage(){
		let dottList = [];
		let start=0, end=0;
		if(this.pageNo <=this.continues+2){
		//分页最左边
			start=3;
			end = this.continues*2+2;
		}else if(this.pageNo > this.totalPages-this.continues-1){
		//分页最右边
			start=this.pageNo-this.continues;
			end = this.totalPages-1;
		}else{
		//分页中间
			start = this.pageNo-this.continues;
			end = this.pageNo+this.continues;
		}
		
		for(let i=start; i<=end; i++ ){
			dottList.push(i);
		}
		//console.log(dottList);
		return dottList;
	},
	
  },
  methods:{
	//更换页面
	changePage(page){
		this.pageNo = page;
		this.$emit('changePage', page);
	},
	//上一页
	prevPage(){
		if(this.pageNo === 1){
			return;
		}
		--this.pageNo;
		this.$emit('changePage', this.pageNo);
	},
	//下一页
	nextPage(){
		if(this.pageNo === this.totalPages){
			return;
		}
		++this.pageNo;
		this.$emit('changePage', this.pageNo);
	},
	
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page{
clear:both;
padding-bottom: 20px; 
}
.sui-pagination{
	height:40px;
	ul{
		display:inline-block;
		float:right;
		margin-right:30px;
		li{
			display:inline-block;
			width:30px;
			height:30px;
			line-height:30px;
			text-align:center;
			border:1px solid #666;
			border-radius: 4px;
			margin:0 3px;
			a{
				text-decoration:none;
				cursor:pointer;
			}
		}
		li.prev, li.next, li.total{
			width:100px;
		}
		li.total{
		margin-left:10px;
		}
	}
	.active{
		background:orange;
	}
}

</style>
