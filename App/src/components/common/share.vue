<template>
	<transition name="slide-ud">
		<div class="mask" v-show="value" @click="cancle">	
			<transition name="slide-ud">
				<div class="bf" v-show="value">
					<ul class="share-wrap">
						<li class="share-li" @click="shareService.shareToWxHy(content)">
							<div class="share-img">
								<img src="@/assets/images/icon-wechat.png">
							</div>
							微信	
						</li>	
						<li class="share-li" @click="shareService.shareToWxPyq(content)">
							<div class="share-img">
								<img src="@/assets/images/icon-friend.png">
							</div>
							朋友圈
						</li>
						<li class="share-li" @click="shareService.shareToQQ(content)">
							<div class="share-img">
								<img src="@/assets/images/icon-qq.png">
							</div>
							QQ
						</li>
						<li class="share-li" @click="shareService.shareToXl(content)">
							<div class="share-img">
								<img src="@/assets/images/icon-weibo.png">
							</div>
							微博
						</li>
					</ul>
					<div class="cancle" @click="cancle">
						取消
					</div>				
				</div>			
			</transition>
		</div>
	</transition>
</template>
<script>
import shareService from "@/service/shareService"
export default {
	props:{
		value:{
			type:Boolean,
			default:false,
		},
		content:{
			type:Object,
			default:{},
		}
	},
	mounted(){	
		try{
			shareService.init();
		}catch(e){

		}
		// document.addEventListener('plusready',this.plusReady,false);
	},
	methods:{
		// plusReady(){
		// 	shareService.init();
		// },
		cancle(){
			this.$emit("input",false)
		}
	}
}
</script>

<style lang="less" scoped>
.mask{
	background: rgba(60, 60, 60, 0.1);
}
.bf{
	height: auto;
}
.share-wrap,.cancle{
	background: #fdfdfd;
	border-radius: 10px;
	margin: 10px;
	width: calc(100% - 20px);
	line-height: 30px;
	text-align: center;
}
.share-wrap{
	display: flex;
	height: 90px;
	justify-content: space-around;
	align-items: center;
}
.share-li{
	/*flex: auto;*/
	color: #666;
}
.share-img{
	margin: 0 auto;
	width: 1.2rem;
	height: 1.2rem;
	border-radius: 50%;
	background-color: #fff;
	img{
		display: inline-block;
		width: .75rem;
		height: .75rem;
		margin-top: .225rem;
	}
}
.iconfont{
	font-size: 20px;
}
.slide-ud-enter-active {
  transition: all .3s ease;
}
.slide-ud-leave-active {
  transition: all .3s ease;
}
.slide-ud-enter, .slide-ud-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  bottom: -50px;
  opacity: 0;
}
</style>