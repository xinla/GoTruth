<template>
	<div>
		<top>
			<template slot="title">{{title}}</template>
		</top>
		<div class="member-msg">
			<div class="member-msg-header">
			    <!-- <div class="member-msg-image">
					<img  :src="userPhoto" >
				</div> -->
				<div class="member-msg-image" @click='handlePreview'>
					 <img  v-for="(img,index) in imgs"  :src="img.url">
					<!--<img :src="userPhoto">-->
				</div>
				<div class="member-msg-modal">
					<ul class="member-msg-list">
						 <!-- @click="(loginUserId == userId) && $Tool.goPage({ name:'release',query:{'title':'发布图文',sort:1}})" -->
						<li class="member-msg-item">
							<span>{{publidsedNum}}</span>
							发布
						</li>
						<li class="member-msg-item">
							<span>{{focusNum}}</span>
							关注
						</li>
						<li class="member-msg-item">
							<span>{{fansNum}}</span>
							粉丝
						</li>
					</ul>
					<div class="member-msg-btn" v-if="loginUserId == userId">
						<button class="btn btn-edit"  @click="$Tool.goPage({ name:'editInfo',query:{'title':'账号设置'}})">账号设置</button>
						<button class="btn btn-apply" @click="$Tool.goPage({ name:'identityIndex',query:{'title':'申请认证'}})">申请认证</button>
					</div>
					<div v-else>
						<!-- 访客所见 -->
					</div>
				</div>
			</div>
		</div>
		<transition enter-active-class="animated fadeIn" leave-active-class=" animated fadeOut">
	</transition>
		<div class="member-tab">
			<ul class="member-switch">
				<!-- <router-link class="member-switch-item active" v-for="(item, index) in switchListPublic" tag="li" :to="{path:item.path,}" :key="index + 'a'" >{{item.desc}}
				</router-link>
				<router-link class="member-switch-item active" v-for="(item, index) in switchListPrivate" tag="li" :to="{path:item.path,}" :key="index" >{{item.desc}}
				</router-link> -->
			</ul>
			<tab :line-width="2" v-model="current" v-show="loginUserId == userId">
		      <tab-item v-for="(item, index) in switchListPublic" :key="item.id+1">
		      	<router-link class="block" :to="{path:item.path,query:{userId}}" replace>
		      		{{item.desc}}
				</router-link>
		      </tab-item>
		      <tab-item v-for="(item, index) in switchListPrivate" :key="item.id">
		      	<router-link class="block" :to="{path:item.path,query:{userId}}" replace>
		      		{{item.desc}}
				</router-link>
		      </tab-item>
		    </tab>
		    <tab v-show="loginUserId != userId" :line-width="2" v-model="currentSub">
		      <tab-item v-for="(item, index) in switchListPublic" :key="item.id+1">
		      	<router-link class="block" :to="{path:item.path,query:{userId}}" replace>
		      		{{item.desc}}
				</router-link>
		      </tab-item>
		      <!-- <tab-item v-if="loginUserId == userId" v-for="(item, index) in switchListPrivate" :key="item.id">
		      	<router-link :to="{path:item.path,query:{userId:item.userId}}" replace>
		      		{{item.desc}}
				</router-link>
		      </tab-item> -->
		    </tab>

		</div>
		<gallary :imgs="imgs" v-show="showGallary" @close="handelGallaryClose"></gallary>
		<keep-alive>
			<router-view class="router-view" :key="$route.name"></router-view>
		</keep-alive>
	</div>
</template>

<script>
import config from '@/lib/config/config'
import articleService from '@/service/articleService'
import followService from '@/service/followService'
import userService from '@/service/userService'
import gallary from "@/components/Gallary"
export default {
	components:{
		gallary
	},
	data(){
		return {
			loginUserId:localStorage.id || 0,
			userId:0,
			current:0,
			currentSub:0,
			currentName:"全部",
			showGallary:false,
			imgs: [
                {
                  url: "",
                }
            ],
			title:'',
			userPhoto:'',
			focusNum:0,
			fansNum:0,
			publidsedNum:0,
			switchListPublic:[
				{id:1, desc:'全部', path:'/personBase/published',},
				{id:2, desc:'文章', path:'/personBase/publishedArticle',},
				{id:3, desc:'视频', path:'/personBase/publishedVideo',},
				{id:4, desc:'问答', path:'/personBase/publishedQA',},
			],
			switchListPrivate:[
				{id:6, desc:'粉丝', path:'/personBase/fans',},
				{id:7, desc:'关注', path:'/personBase/focus',},
				{id:8, desc:'收藏', path:'/personBase/collect',},
				{id:9, desc:'历史', path:'/personBase/history',},
			]
		}
	},
	methods:{
		handlePreview(){
			this.showGallary = true;
		},
		handelGallaryClose(){
			this.showGallary = false;
		},
		init(){
			if (localStorage.id && localStorage.id == this.userId) {
	    		this.userPhoto = localStorage.userImg;
				this.title = localStorage.userName;
				this.imgs[0].url = this.userPhoto;
			}else{
				let res = userService.getUserById(this.userId);
				if (res && res.status == "success") {
					this.userPhoto =  this.$Tool.headerImgFilter(res.result.user.imageurl);
					this.title = res.result.user.username;
					this.imgs[0].url = this.userPhoto;
				}
			}
			//获取文章数量
			articleService.getUserArticleCount(this.userId,(data)=>{
				if (data && data.status == "success" ) {
					this.publidsedNum = data.result.count;
				}
			});
			//获取粉丝数量
			followService.getUserVermicelliCount(this.userId,(data)=>{
				if (data && data.status == "success" ) {
					this.fansNum = data.result.count;
				}
			});
			//获取关注数量
			followService.getUserFollowCount(this.userId,(data)=>{
				if (data && data.status == "success" ) {
					this.focusNum = data.result.count;
				}
			});
		 }
	},
	watch:{
		userId(){
			this.init();
		},
		$route(to,from){
			// to.query.userId ? (this.userId = to.query.userId):this.userId = localStorage.id;
			to.query.userId && (this.userId = to.query.userId)
			if(this.$route.name == 'published'){
				this.ifSelf?this.current = 0:this.currentSub = 0;
			}
			// console.log(this.current)
		},
	},
	computed:{
		ifSelf(){
            return (localStorage.id == this.userId);
        }
	},
	// activated() {
	//   	this.$nextTick(()=>{
	//       this.init();
	//   	})
	// },
	beforeRouteEnter (to, from, next) {
		// console.log(from);
    	if (!to.query.userId && !localStorage.id) {
            GoTruth.$vux.alert.show({
			  content:'您还未登录',
			})
			return false;
        }
	    next((vm)=>{
	      	vm.userId = to.query.userId;
	    	if (!vm.userId){
	    		vm.userId = localStorage.id;
	    	}
			vm.current = Number(to.query.current || vm.current);
	      	// vm.init();
		});
	},
}
</script>

<style lang="less" scoped>
	.member-msg{
		// margin-top: calc(@topHeigth + .18rem);
		padding: .3rem .4rem;
		background-position: 0 0;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url('../../assets/images/logo-bg.png');
		color: #fff;
		.member-msg-header{
			display: flex;
			overflow: hidden;
			.member-msg-image{
				width: 1.4rem;
				height: 1.4rem;
				border-radius: 50%;
				overflow: hidden;
				// margin-right: .6rem;
				img {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 50%;
					border: .04rem solid @borderColor;
				}
			}
			.member-msg-modal {
				position: absolute;
				right: .4rem;
				.member-msg-list{
					display: flex;
					overflow: hidden;
					padding-top: .1rem;
					.member-msg-item{
						text-align: center;
						margin-right: .7rem;
						font-size: .24rem;
						span{
							display: block;
							margin-bottom: .1rem;

						}
					}
				}
			}
			.member-msg-btn{
				margin-top: .2rem;
				button {
					padding: .08rem .2rem;
					color:#66b3ff;
					font-size: .24rem;
					border: .02rem solid #66b3ff;
					border-radius: .24rem;
					margin-right: .2rem;
				}
				.btn-deit{
					color:#66b3ff;
					border-color: #66b3ff;
				}
				.btn-apply{
					color: #fff;
					border-color: @mainColor;
					background-color: @mainColor;
				}

			}
		}
	}
	.member-tab{
		background-color: #fff;
		.member-switch {
			display: flex;
			text-align: center;
			white-space: nowrap;
			overflow-x: auto;
			.member-switch-item{
				flex: none;
				height: .7rem;
				line-height: .7rem;
				font-size: .28rem;
				width: 20%;
				border-bottom: .02rem solid @borderColor;
			}
			.router-link-active.active {
				color: @mainColor;
				border-bottom: .04rem solid @mainColor;
			}

		}
	}
	.router-view{
	    height: calc(100% - 190px);
	    overflow-y: auto;
		background: #fff;
		// padding: 0 15px;
	}
	.block{
		display: block;
	}
</style>

<style>
	.lg-preview-nav-right,.lg-preview-nav-left{
		display: none !important;
	}
</style>
