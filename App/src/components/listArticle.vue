<template>
	<downRefresh class="main-content" @refresh="doRefresh()" @scrolling="loadMore">
		<div @click="$store.dispatch('setIsScolling',false);">			
			<prompt-blank style="margin-top:100px;" v-if="ifNet" mes="断网啦..."></prompt-blank>
			<loading-main v-if="!ifNet && !arcList.length"></loading-main>
			<multIT v-for="(item,index) in arcList" :article="item" :key="index"></multIT>
			<load-more v-show="arcList.length && ifLoad" :show-loading="ifLoading" :tip="tip"></load-more>
		</div>
	</downRefresh>
</template>

<script>
import netUtil from "@/service/util/netUtil"
import downRefresh from '@/components/common/downRefresh'
import articleService from '@/service/articleService'
export default {
	components:{
		downRefresh,
	},
	data(){
		return {
			arcList:[],
			page:1,
			lock:false,
			ifLoad:false,
			scrollTop:0,	
			total:0,
			ifNew:false,
			ifNet:false,
			ifLoading:true,
			tip:"正在加载",	
		}
	},
	props:{
		classify:{
			type:Number,
			default:0,
		},
		show:{
			type:Boolean,
			default:false,
		}
	},
	mounted () {
		this.$nextTick(()=>{
			let net = {}
			function getNet() {
				net = netUtil.getNetInfo();	
				if (net.network == "未连接网络") {
					this.ifNet = true;
					return;
				}
			}
			try{
				document.addEventListener('plusready', getNet.bind(this));
				document.removeEventListener('plusready', getNet.bind(this));
			}catch(e){
				// console.log(e)
			}
			if (!this.classify) {
				this.init();				
			}
		})

	},
	methods:{
		init(){
			let resArticlePage;
			try{
				if(this.classify == 0){
					resArticlePage = articleService.articlePage(this.page,15);
				}else{
					resArticlePage = articleService.articlePage(this.page,15,this.classify);
				}
				if (resArticlePage && resArticlePage.status == "success") {
					this.arcList = resArticlePage.recordPage.list;	
						// debugger
					if (this.total == resArticlePage.recordPage.totalRow) {
						this.ifNew = true;
					}else{
						this.total = resArticlePage.recordPage.totalRow;			
					}
						this.page++;						
					// console.log(this.arcList);
				}				
			}finally{	
				this.lock = false;
				// this.ifLoad = false;			
			}
		},
		doRefresh(){
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
			this.page = 1;
			this.init();
			if (this.ifNew) {
				this.$vux.toast.show({
					type:"text",
					time:800,
					text:"已经是最新内容啦",
					width:"50%",
				});				
			}
		},
		getMore(){
			// debugger
			this.lock = true;
			let resArticlePage;
			try{
				if(this.classify == 0){
					resArticlePage = articleService.articlePage(this.page,15);
				}else{
					resArticlePage = articleService.articlePage(this.page,15,this.classify);
				}
				if (resArticlePage && resArticlePage.status == "success") {
					this.arcList = [...this.arcList,...resArticlePage.recordPage.list];	
					if (resArticlePage.recordPage.list.length) {
						this.page++;						
					}else{
						// this.$vux.toast.show({
						// 	type:"text",
						// 	time:800,
						// 	text: '暂无更多，不妨到我隔壁去看看吧~',
						// 	width:"auto",
						// });
						this.ifLoading = false;
						this.tip = "你看到我的底线啦";
					}
					// console.log(this.arcList);
				}		
			}finally{
				this.lock = false;
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
			if (!this.ifLoad) {
				this.ifLoad = true;
			}
			if (!this.isScolling) {
				this.$store.dispatch('setIsScolling',true);
			}
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height() + 1) >= e.target.scrollHeight) {
				this.getMore();
			}
			this.scrollTop = $(e.target).scrollTop();	
			// console.log(this.scrollTop)			
		}

	},
	watch:{
		$route(){
			$(".main-content").eq(this.classify).scrollTop(this.scrollTop);
		},
		show(){	
			this.$nextTick(()=>{		
				this.init();
			})				
		}
	},
	computed:{
		isScolling(){
			return this.$store.state.isScolling;
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.main-content{
		position: relative;
		height: calc(100vh - 2.7rem);
		overflow: hidden;
		overflow-y: auto;
		-webkit-overflow-scrolling:touch;
		/*// padding: 0 .3rem;
		// padding-bottom: .3rem;*/
	}
	.refresh{
		background: #fafafa;
		overflow: hidden;
	}
	.animate{
		transition: all .5s;
	}
</style>