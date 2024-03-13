<template>
  <div class="home">
	<TypeNav />
	<ListContainer />
	<Recommend />
	<Like />
	<Floor v-for="(floor, index) in floorList"
	:key="floor.id"
	:floor=floor
	/>
	<!-- <Brand /> -->
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'

export default {
	name: 'Home',
	components : {
		ListContainer,
		Recommend,
		Rank,
		Like,
		Floor,
		Brand,
	},
	
	computed : {
		...mapState({floorList:(state)=>state.home.floorList}),
	},
	mounted(){
		this.$store.dispatch('getFloorList');
		
	}
}
</script>

<style scoped lang="less">
.home{
	width:1200px;
	margin:0 auto;
}
</style>
