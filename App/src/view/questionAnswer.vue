<!-- 首页问答页面 -->
<template>
	<div class="index">
		<home-header></home-header>
		<div class="main-wrap">
			<div class="bfc-o main-box">
				<tab :line-width=2 active-color='#fc378c' v-model="classifyIndex">
					<tab-item :selected="currentClassiftyName == '推荐'" @click="currentClassiftyName = '推荐'">推荐
					</tab-item>
					<tab-item :selected="currentClassiftyName == item.classifyname" v-for="(item,index) in classifyList" @click="currentClassiftyName = item.classifyname" :key="index">{{item.classifyname}}
					</tab-item>
				</tab>
				<div class="nav-add" @click="handleMore" v-model="showMore" v-if="0">
					<i class="iconfont icon-menu1"></i>
				</div>
				<div v-transfer-dom>
					<popup v-model="showMore" position="bottom" height="100%">
						<div class="more-title" @click="handleClose">
							<i class="iconfont icon-close"></i>
						</div>
						<home-more></home-more>
					</popup>
				</div>
			</div>
			<div class="main" ref="main">
				<swiper v-model="classifyIndex" :height="swiperHeight + 'px'" :show-dots="false" :threshold="150" >
			        <swiper-item>
			          	<listQuestion></listQuestion>
			        </swiper-item>
			        <swiper-item v-for="(item,index) in classifyList" :key="index">
			          	<listQuestion :classify="item.classifycode" :show="item.classifycode == classifyIndex?showArr[classifyIndex] = true:showArr[item.classifycode]"></listQuestion>
			        </swiper-item>
		      	</swiper>
			</div>
		</div>
	</div>
</template>

<script>
import { TransferDom,Swiper,SwiperItem, Popup } from 'vux'
import homeHeader from '@/components/headerBar'
import homeMore from'@/components/more'
import listQuestion from '@/components/listQuestion'


export default {
		directives: {
    		TransferDom
  		},
		components:{
			homeHeader,
			homeMore,
			Swiper, 
			SwiperItem,
			listQuestion,
			Popup,
		},
		data(){
			return {
				showMore:false,
				classifyList:[],
				classifyIndex:0,
				currentClassiftyName:"推荐",
				swiperHeight:0,
				showArr:[],
			}
		},
		mounted () {
	    	this.classifyList = JSON.parse(localStorage.classify);
	    	this.swiperHeight = document.body.clientHeight - $(this.$refs.main).offset().top;
	    },
		methods:{
			//导航栏添加弹出popup
			handleMore(){
				this.showMore = true;
			},
			//关闭popup
			handleClose(){
				this.showMore = false;
			},
	    },
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
		.main{
			height: calc(100% - 90px);
			overflow-y:auto;
		}
		.nav-add {
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

		}

	}
	.more-title {
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
	}	
	.main-content{
		height: 100%;
		overflow-y: auto;
	}
  .vux-tab .vux-tab-item{
    font-size: 17px !important;
    font-weight: 500;
    flex: 0 0 18% !important;
  }
	
</style>
<style>
  /*vux tab 样式修改*/
  .vux-tab-wrap{
    padding-top: .76rem !important;
  }
  .vux-tab .vux-tab-item{
    color: #000 !important;
    line-height: .76rem !important;
    font-size: .28rem !important;
  }
  .vux-tab-container{
    height: .76rem !important;
  }
  .vux-tab .vux-tab-item.vux-tab-selected{
    color: rgb(252, 55, 140) !important;
  }
  .vux-tab{
    height: .76rem !important;
  }
</style>
