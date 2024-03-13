<template>
<div class="order-right" style="width:950px;float:left;margin-left:30px;">

				<div class="order-content">
					<div class="title">
						<h3>我的订单</h3>
					</div>
					<div class="chosetype">
						<table>
							<thead>
								<tr style="height:30px;">
									<th width="13%">商品</th>
									<th width="47%">订单详情</th>
									<th width="8%">收货人</th>
									<th width="15%">金额</th>
									<th width="10%">状态</th>
									<th width="10%">操作</th>
								</tr>
							</thead>
						</table>
					</div>
					
					<div class="orders">
						<table class="order-item" v-for="(order, index) in myOrder.records" :key="order.id">
							<thead>
								<tr>
									<th>
										<span class="ordertitle">
											{{order.createTime}} 订单编号:{{order.outTradeNo}}
											<span class="pull-right delete">
												删除
											</span>
										</span>
									</th>
								</tr>
							</thead>
							
							<tbody style="">
								<tr>
									<td width="60%">
										<div class="typographic" v-for="(item, index2) in order.orderDetailList">
											<img :src="item.imgUrl" />
											<span class="descript">{{item.skuName}}</span>
											<span class="num">X{{item.skuNum}}</span>
											<span class="please">售后申请</span>
										</div>
									</td>
									<td width="10%">{{order.consignee}}</td>
									<td width="15%">总金额：￥{{order.totalAmount}} 在线支付</td>
									<td>{{order.orderStatusName}}</td>
									<td>评价晒单</td>
								</tr>
							
							</tbody>
						</table>
					</div> <!-- order -->
					
				</div>
				<!-- 分页器 -->
				<Pagination 
				:totalPages= "myOrder.pages"
				:pageSize="limit"
				:total= "myOrder.total"
				@changePage="changePage"/>
			</div>



</template>

<script>
export default {
	name: 'myOrder',
	data(){
		return {
			//初始化一些参数
			page : 1,
			limit : 5,
			myOrder : {},
		};
	},
	methods :{
		//获取订单的方法
		async getData(){
			let result = await this.$API.reqGetOrderAuth(this.page, this.limit);
			//console.log(result.data.records[1]);
			/*
			current: 1
			pages: 784
			records: Array(5) [ {…}, {…}, {…}, … ]​​
			searchCount: true
			size: 5
			total: 3919
			*/
			if(result.code === 200){
				this.myOrder = result.data;
			}
			
		},
		changePage(page){
			//alert(page);
			this.page = page;
			this.getData();
		}
	},
	mounted(){
		this.getData();
	},
}
</script>

<style scoped lang="less">
body *{
	margin:0;
	padding:0;
}

.order-content{
	.title{
		height:40px;
		border:1px solid #bbb;
		background:#eee;
		h3{
			height:40px;
			line-height:40px;
			text-indent:20px;
		}
	}
	
	.chosetype{
		margin-top:20px;
		height:30px;
		border:1px solid #bbb;
		background:#eee;
		table{
			width: 100%;
			font-size:14px;
		}
	}
}


.orders{
	border:1px solid #bbb;
	margin-top:20px;
	padding:0;
	tbody{
		width:100%;
		display:block;
		float:left;
		padding:0;
		tr{
			margin:0;
			td{
				text-align:center;
				margin:0;
				border-right:1px solid #bbb;
			}
			td:last-child{
				border:none;
			}
		}
	}
}

.order-item{
	margin:0;
	padding:0;
	width:100%;
	thead{
		width:100%;
		float:left;
		background:#eee;
		border-bottom:1px solid #bbb;
		position:relative;
		th{
			height:30px;
			line-height:30px;
		}
	}
}

.typographic{
	height:70px;
	border-bottom:1px solid #bbb;
	padding:10px;
	
	img{
		height:70px;
		width:15%;
		border:1px solid #bbb;
		display:block;
		float:left;
	}
	span{
		margin-left:5px;
		display:block;
		float:left;
	}
	span.descript{
		width:50%;
		color:red;
	}
	span.num{
		width:8%;
	}
	span.please{
		width:20%;
	}
}

.typographic:last-child{
	border:none;
}

.ordertitle{
	width:100%;
	height:30px;
	display:block;
}
.delete{
	position:absolute;
	right:10px;
	font-size:14px;
	font-weight:normal;
	cursor:pointer;
}

</style>


