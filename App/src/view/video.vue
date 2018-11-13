<template>
	<div>
		<home-header></home-header>
		<down-refresh @refresh="init()" class="main-content" @scrolling="loadMore" ref="srcoll">
			<div >
				<prompt-blank style="margin-top:100px;" v-if="ifNet" mes="断网啦..."></prompt-blank>
				<loading-main v-if="!ifNet && !arcList.length"></loading-main>
				<z-video 
				ref="zjzx-video"
				v-for="(item,index) in arcList" 
				:article="item" 
				:key="index"
				:whi="index"
				@allPause="doAllPause"
				>
				</z-video>
				<load-more v-show="arcList.length && ifLoad" :show-loading="ifLoading" :tip="tip"></load-more>
			</div>
		</down-refresh>
	</div>
</template>

<script>
import netUtil from "@/service/util/netUtil"
import homeHeader from '@/components/headerBar'
import zVideo from '@/components/common/video'
import downRefresh from '@/components/common/downRefresh'

import articleService from '@/service/articleService'
export default {
	components:{
		homeHeader,
		zVideo,
		downRefresh,
	},
	data(){
		return {
			arcList:[],
			page:1,
			lock:false,
			ifLoad:false,
			ifNet:false,
			ifNew:false,
			scrollTop:0,
			ifLoading:true,
			tip:"正在加载",
			timeId:0,
		}
	},
	mounted(){
		setTimeout(()=>{
			this.init();
			if (this.arcList.length) {
				this.ifLoad = true;
			}
		},100)
	},
	methods:{
		init(){
			this.page = 1;
			let net = {};
			try{
				net = netUtil.getNetInfo();	
			}catch(e){
				// console.log(e)
			}
			if (net.network == "未连接网络") {
				this.ifNet = true;
				return;
			}else{
				this.ifNet = false;
			}
			let resArticlePage;
				resArticlePage = articleService.articlePage(this.page,15,'',2);
			// if(this.classify == 0){
			// }
			// else{
			// 	resArticlePage = articleService.articlePage(this.page,15,this.classify);	
			// }
			if (resArticlePage && resArticlePage.status == "success") {
				this.arcList = resArticlePage.recordPage.list;
				if (resArticlePage.recordPage.list.length) {
					this.page++;	
					this.ifNew = false;						
				}else{
					this.ifNew = true;
				}
				// console.log(this.arcList);articlePage
				if (this.ifNew) {
					this.$vux.toast.show({
						type:"text",
						time:800,
						text:"已经是最新内容了",
						width:"50%",
					});				
				}
			}
		},
		loadMore(e){
			this.throttle(this._loadMore,this,e);
		},
		//函数节流控制
		throttle(method,context,arg) {
			let cur = +new Date();
			if (cur - (method.last || 0) > 20) {
				method.call(context,arg);
				method.last = cur;
			}
		},
		_loadMore(e){
			//防止用户滚动中点击跳转
			if (!this.isScolling) {
				this.$store.dispatch('setIsScolling',true);
			}
			this.scrollTop = $(e.target).scrollTop();
			// 滚动结束200ms后解禁滚动状态
			clearTimeout(this.timeId);
			this.timeId = setTimeout(()=>{
				if (!this.lock && ($(e.target).scrollTop() + $(e.target).height() + 10) > e.target.scrollHeight) {
						this.getMoreActicle();					
					// setTimeout(()=>{
					// },300)
				}
			},200)
		},		
		getMoreActicle(){
			this.lock = true;
			let resArticlePage;
				resArticlePage = articleService.articlePage(this.page,15,'',2);
			// if(this.classify == 0){
			// }
			// else{
			// 	resArticlePage = articleService.articlePage(this.page,15,this.classify);	
			// }
			if (resArticlePage && resArticlePage.status == "success") {
				this.arcList = this.arcList.concat(resArticlePage.recordPage.list);
				if (resArticlePage.recordPage.list.length) {
					this.page++;						
				}else{
					this.ifLoading = false;
					this.tip = "你看到我的底线啦";
				}
				this.lock = false;
				// console.log(this.arcList);articlePage
			}
		},
		doAllPause(whi){
			this.$refs['zjzx-video'].forEach((item,index)=>{
				if (whi != index) {
					item.pause();
				}
			});
		},
		// getNet(){
		// 	let net = netUtil.getNetInfo();	
		// 	if (net.network == "未连接网络") {
		// 		this.ifNet = true;
		// 		return;
		// 	}else{
		// 		this.ifNet = false;
		// 	}
		// }
	},
	watch:{
		$route(){
			$(this.$refs["srcoll"].$el).scrollTop(this.scrollTop);
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.main-content{
		height:calc( 100vh - 2.3rem );
		overflow-y: auto;
	}
</style>
