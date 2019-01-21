<template>
	<div class="container" @click="handelGallaryClick">
		<div class="wrapper">
			 <swiper :options="swiperOptions">
				<swiper-slide v-for="(item, index) in imgs" :key="index">
					<img class="gallary-img" :src="item.url">
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
			imgs:{
				type: Array,
				default() {
					return  []
				}
			}
		},
		 data () {
		    return {
		      swiperOptions: {
		        paginationType: 'fraction',
		        observeParents: true,
		        observer: true
		      }
		    }
		  },
		  methods:{
		  	handelGallaryClick(){
		  		this.$emit('close')
		  	}
		  }
	}
</script>

<style lang="less" scoped>
	.swiper-container{
		overflow: inherit;
	}
	.container{
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 99;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0,0,0,0.8);
		.wrapper{
			height: 0;
			width: 100%;
			padding-bottom: 100%;
			.gallary-img{
				width: 100%;
			}
			.swiper-pagination{
				color: #fff;
				bottom: -.5rem;
			}
		}
	}
</style>
<style>
</style>