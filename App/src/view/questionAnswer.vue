<!-- 首页问答页面 -->
<template>
	<div class="index">
		<home-header></home-header>
		<div class="main-wrap">
          	<listQuestion></listQuestion>
		</div>
	</div>
</template>

<script>
// import homeMore from'@/components/more'
import listQuestion from '@/components/listQuestion'
import articleClassifyService from '@/service/article_classifyService'
export default {
		components:{
			listQuestion,
		},
		/*methods:{
			//导航栏添加弹出popup
			handleMore(){
				this.showMore = true;
			},
			//关闭popup
			handleClose(){
				this.showMore = false;
			},
	    },*/
	}
</script>
<style lang="less" scoped>
	.index{
		height: 100vh;
		width: 100%;
		overflow: hidden;
	}
	.main-wrap{
		height: 100vh;
		width: 100%;
		background: #fff;
		overflow: hidden;
    .main-box{
      border-bottom: .02rem solid @borderColor;
    }
		/* .nav-add {
			position: absolute;
			right: 0;
			top: 0;
			width: .72rem;
			height: @navHeight;
			line-height: @navHeight;
			text-align: center;
			background-color: rgb(255,255,255);
			box-shadow:-.1rem 0px .4rem #cccccc;
			color:#000;
			i {
				font-size: .40rem;
			}
		}
		
		.vux-popup-dialog{
			background-color: transparent;
		
		} */

	}
	/* .more-title {
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99999;
			height: .87rem;
			background-color: #fff;
			border-radius: .3rem .3rem 0 0;
			line-height: .87rem;
			border-bottom: .01rem solid @borderColor;
			padding: 0 .3rem;
			i{
				font-size: .45rem;
				font-weight: 700;
			}
		} */	
	.main-content{
		height: 100%;
		overflow-y: auto;
	}
</style>
