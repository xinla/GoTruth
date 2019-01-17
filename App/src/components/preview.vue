<template>
	<div class="container" @click="handlePreClick">
		<div class="wrapper">
			<swiper>
				<swiper-item v-for="(item,index) in imgs" :key="index">
					<img :src="item.url">
				</swiper-item>
			</swiper>
			<i class="iconfont icon-close"  @click="handlePreClick"></i>
		</div>
	</div>
</template>

<script>
	import { Swiper,SwiperItem } from 'vux'
	export default{
		components:{
			Swiper,
			SwiperItem,
		},
		props:{
			imgs:{
				type: Array,
				default (){
					return []
				}
			}
		},
		
		data(){
			return {
				swiperOptions:{
					pagination: '.siper-pagination',
					paginationType: "fraction",
					observeParents: true,
					observe: true
				}
			}
		},
		methods:{
			handlePreClick(){
				this.$emit('close');
			},
	
		}
	}
</script>

<style lang="less" scoped>
	.container{
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 99;
		background-color: #000;
		img{
			display: block;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
		.swiper-pagination{
			color: #fff;
		}
		.iconfont{
			position: absolute;
			left: .25rem;
			top: .25rem;
			font-size: .5rem;
			color: #fff;
		}
	}
</style>
<style lang="less">
	.vux-swiper{
		height: 280px !important;
	}
	.vux-indicator{
		display: none;
	}
</style>