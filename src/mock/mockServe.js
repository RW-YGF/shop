import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

//模拟轮播图的数据
Mock.mock("/mock/banner", {
	code : 200,
	data : banner,
	
});

Mock.mock("/mock/floor", {
	code : 200,
	data : floor,
	
});