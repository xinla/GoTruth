<template>
	<!--<div class="bfc-o"  @click="$Tool.goPage({ name:'detail',query:{id:article.id,detailType,}})">
		<div class="article-wrap">
      sdfdsfsdjflkdsjflkdsjflkdssdlkfjdslk
			<div class="article-item clearfix" v-if="3 == article.type">		
				&lt;!&ndash; 浮动单图片 &ndash;&gt;
				<img class="float-img a" v-if="imgList.length == 1" :src="imgList[0] || imgurl" >
				<img class="float-img" v-else-if="ArticleFile.length == 1" :src="ArticleFile[0].url?(fileRoot+ArticleFile[0].url):imgurl">					
				&lt;!&ndash; 公共标题 &ndash;&gt;
				<h2 class="article-title">{{article.title}}</h2>
				&lt;!&ndash; 二或三图 &ndash;&gt;
				<div class="multiple-img-wrap" v-if="imgList.length > 1">
					<div class="multiple-img" v-for="(item,index) in imgList">
						<img :src="item?item:imgurl">
					</div>
				</div>
				<div class="multiple-img-wrap" v-else-if="ArticleFile.length > 1">
					<div class="multiple-img" v-for="(item, index) in ArticleFile" v-if="index < 3">
						<img :src="item.url?(fileRoot+item.url):imgurl" >
					</div>
				</div>
				&lt;!&ndash; 问题回答 &ndash;&gt;
				<div class="article-footer clearfix">
					<div class="fl">
						<span v-if="ifPublisher">{{publisher}}</span>
						<span>{{CommentNum}}回答</span>
						<span>{{publishtime}}</span>
					</div>
					<div class="fr article-remove" @click="$emit('delete',[article.id,whi,$event])" v-if="ifDel">
						<i class="iconfont icon-remove"></i>
					</div>
				</div>
			</div>
		</div>
	</div>-->
  <div class="wenda-wrap">
    <div class="wenda-user">
      <div class="wenda-login" v-if="!ifLogin">
        <router-link class="header-nologin"  :to="{path:'/topBase/login',query:{title:'用户登录'}}" tag="div">
          <span>马上登录</span>，参与回答
        </router-link>
        <ul class="body">
          <router-link class="item" :to="{path:'answerSubject'}" tag="li">
            <i class="iconfont icon-dati"></i>
            <span>答题</span>
          </router-link>
          <!--<li class="item">-->

          <!--</li>-->
          <li class="item">
            <i class="iconfont icon-eye2"></i>
            <span>发现</span>
          </li>
        </ul>
      </div>
      <div class="wenda-login" v-if="ifLogin">
        <div class="header-login clearfix">
          <div class="left fl">
            <img :src="userPhoto">
            <span class="username">{{userName}}</span>
          </div>
          <div class="right fr">
            我的问答
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </div>
        <ul class="body">
          <router-link class="item" :to="{path:'answerSubject'}" tag="li">
            <i class="iconfont icon-dati"></i>
            <span>答题</span>
          </router-link>
          <li class="item">
            <i class="iconfont icon-tiwen"></i>
            <span>提问</span>
          </li>
          <li class="item">
            <i class="iconfont icon-eye2"></i>
            <span>发现</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="wenda-list">
      <div class="wenda-title">妩媚倾城的面容 我蛊惑万千众生 孰不知 心里 早有了一个人 ..却只能无尽的思念 你送我的宝珠 我一直带着 只因为我能看见你的身影。..却只能无尽的思念 你送我的宝珠 我一直带着 只因为我能看见你的身影</div>
      <ul class="wenda-img-list">
        <li class="wenda-item">
          <img src="@/assets/images/a.jpg" alt="">
        </li>
        <li class="wenda-item">
          <img src="@/assets/images/b.jpg" alt="">
        </li>
        <li class="wenda-item">
          <img src="@/assets/images/c.jpg" alt="">
        </li>
      </ul>
      <div class="wenda-footer clearfix">
        <div class="left fl clearfix">
          <span class="wenda-username">你你好你好你好你好你好你好好</span>
          <span class="wenda-time">1小时前</span>
          <span class="wenda-num">666回答</span>
        </div>
        <div class="right fr">
          <i class="iconfont icon-remove"></i>
        </div>
      </div>
    </div>
    <div class="wenda-list clearfix">
      <div class="float-img fr">
        <img src="@/assets/images/a.jpg">
      </div>
      <div class="wenda-title">妩媚倾城的面容 我蛊惑万千众生 孰不知 心里 早有了一个人 ..却只能无尽的思念 你送我的宝珠 我一直带着 只因为我能看见你的身影。..却只能无尽的思念 你送我的宝珠 我一直带着 只因为我能看见你的身影</div>

      <div class="wenda-footer clearfix">
        <div class="left fl clearfix">
          <span class="wenda-username">你好</span>
          <span class="wenda-time">1小时前</span>
          <span class="wenda-num">666回答</span>
        </div>
        <div class="right fr">
          <i class="iconfont icon-remove"></i>
        </div>
      </div>
    </div>
    <div class="wenda-list clearfix">
      <div class="wenda-title">妩媚倾城的面容 我蛊惑万千众生 孰不知 心里 早有了一个人 ..却只能无尽的思念 你送我的宝珠 我一直带着 只因为我能看见你的身影。..却只能无尽的思念 你送我的宝珠 我一直带着 只因为我能看见你的身影</div>
      <div class="big-img">
        <img src="@/assets/images/a.jpg">
      </div>
      <div class="wenda-footer clearfix">
        <div class="left fl clearfix">
          <span class="wenda-username">你好</span>
          <span class="wenda-time">1小时前</span>
          <span class="wenda-num">666回答</span>
        </div>
        <div class="right fr">
          <i class="iconfont icon-remove"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import config from '@/lib/config/config'
import articleFileService from '@/service/article_fileService'
import articleCommentService from '@/service/article_commentService'
import userService from '@/service/userService'
import articleService from '@/service/articleService'
import interlocutionService from '@/service/interlocutionService'
export default {
  data(){
    return {
      ifLogin:false,
      userName:'',
      userPhoto:''
    }
  },
  activated(){
    this.$nextTick(()=>{
      this.init();
    })
  },
  methods:{
    init() {
      let token = localStorage.getItem('token');

      //判断是否登录
      if (!token) {
        this.ifLogin = false;
        return;
      }
      this.userPhoto = localStorage.userImg;
      this.userName = localStorage.userName;
      this.ifLogin = true;


    }


  },

/*	data(){
		return {
			imgurl:require('@/assets/images/userPhoto.jpg'),
			ArticleFile:[
				// {
				// 	thumbnail:"",
				// }
			],
			CommentNum:0,
			publishtime:"",
			fileRoot:config.fileRoot+'/',
			publisher:"",
			imgList:[],
		}
	},
	props:{
		article:{
			type:Object,
			default:{}
		},
		whi:{
			type:Number,
		},
		//判断是否为作者详情视图(真:为作者视图；假（空）:为浏览视图)
		detailType:{
			type:String,
			default:"",
		},
		//判断是否显示发布人
		ifPublisher:{
			type:Boolean,
			default:true,
		},
		ifDel:{
			type:Boolean,
			default:false,
		},
	},
	mounted(){
		this.$nextTick(()=>{
			this.init();
		})
	},	
	watch:{
		//使用了缓存，父组件传值发生改变，子组件需要监测对应改变的对象值，不然子组件重新渲染还是使用缓存中的值
		article(){
			this.init();
		},
	},
	methods:{
		init(){
			articleFileService.getFileByArticle(this.article.id,data=>{
				if (data && data.status == "success") {
					this.ArticleFile = data.result.filelist;				
				}				
			});
			if (this.ifPublisher) {
				if (this.article.author) {
					try{
						userService.getUserById(this.article.author,data=>{
							if (data && data.status == "success") {
								this.publisher = data.result.user.username;
							}
						});										
					}catch(err){
						
					}
				}				
			}
			// 获取问题回答数量
			articleCommentService.getArticleCommentCount(this.article.id,data=>{
				if (data.status == "success") {
					this.CommentNum = data.result.count;		
				}else{
					this.CommentNum = 0;
				}					
			});

			this.publishtime = this.$Tool.publishTimeFormat(this.article.publishtime);	
			if (!this.article.type) {
				this.imgList = this.$Tool.extractImg(this.article.content,3);				
			}
		}
	}*/
}
</script>
<style lang="less" scoped>
  .wenda-wrap{
    height: calc(100vh - .87rem);
    overflow: hidden;
    overflow-y: auto;
    padding: 0 .3rem .8rem .3rem;
    background-color: #f3f4f5;
    .wenda-login{
      background-color: #fff;
      margin-bottom: .3rem;
      border-bottom: .02rem solid @borderColor;
      .header-nologin{
        padding: .47rem 0;
        text-align: center;
        border-bottom: .02rem solid @borderColor;
        span{
          color: #406599;
        }
      }
      .header-login{
        padding: .24rem 0;
        background-color: #fff;
        border-bottom: .02rem solid @borderColor;
        .left{
          display: flex;
          line-height: .72rem;
          img{
            display: block;
            width: .72rem;
            height: .72rem;
            margin-right: .2rem;
            border-radius: 50%;
          }
          .username{
            max-width: 2.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .right{
          line-height: .72rem;
          color: #999;
        }
      }
      .body{
        display: flex;
        padding: .2rem 0;
        .item{
          flex: 1;
          text-align: center;
          padding: .1rem 0;
          border-right: .02rem solid @borderColor;
          &:last-child{
            border-right: none;
          }
          .iconfont{
            font-size: .36rem;
            margin-right: .1rem;
          }
          .icon-dati{
            color: #568fec;
          }
          .icon-tiwen{
            color: #ffc803;
            font-size: .4rem;
          }
          .icon-eye2{
            color: #ff6b6a;
          }
          span{
            font-size: .3rem;
            font-weight: 700;
          }
        }
      }
    }
    .wenda-list{
      padding-top: .26rem;
      border-bottom: .02rem solid @borderColor;
      background-color: #fff;
      .wenda-title {
        max-height: 1.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        font-size: 0.32rem;
        line-height: 0.46rem;
        font-weight: 500;
        margin-bottom: 0.1rem;
      }
      /*三图*/
      .wenda-img-list{
        display: flex;
        .wenda-item{
          margin-right: .06rem;
          border: .02rem solid @borderColor;
          border-radius: .04rem;
          &:last-child{
            margin-right: 0;
          }
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      /*浮动图片*/
      .float-img{
        width: 2rem;
        height: 1.3rem;
        margin-left: .3rem;
        img{
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          padding: 0.02rem;
        }
      }
      /*底部大图*/
      .big-img{
        width: 100%;
        height: 3.26rem;
        img{
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .wenda-footer{
      height: .72rem;
      line-height: .72rem;
      font-size: .26rem;
      color: #999;
      border-bottom: .02rem solid @borderColor;
      .left{
        span{
          float: left;
          margin-right: .12rem;
        }
        .wenda-username{
          max-width: 2.8rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .right{
        width: .42rem;
        height: .32rem;
        line-height: .28rem;
        margin-top: .2rem;
        border: .02rem solid #c3c3c3;
        border-radius: .08rem;
        text-align: center;
        .iconfont{
          font-size: .2rem;
          color: #c3c3c3;
        }
      }
    }
  }
</style>
<!--<style lang="less" scoped>
	.article-wrap {
		padding: 0 .3rem;
		.article-item{
			border-bottom: .02rem solid @borderColor;
			padding: .15rem 0;
			.article-title{
				// height: 1.3rem;
				max-height: 1.4rem;
				overflow: hidden;
				text-overflow:ellipsis;
				display:-webkit-box;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:3;
				font-size: .32rem;
				line-height: .46rem;
				font-weight: 500;
				margin-bottom: 0.06rem;
			}
			.float-img{
				display: block;
				width: 2rem;
				height: 1.3rem;
				margin-left: .3rem;
				object-fit: cover;
				padding: .02rem;
				float: right;
			}
			.multiple-img-wrap{
				display: flex;
				width: 100%;
				height: 1.6rem;
				overflow: hidden;
				img{
					display: block;
					width: 100%;
					height: 100%;
					padding: .02rem;
					object-fit: cover;
				}
			}
			.article-video{
				position: relative;
				width: 100%;
				height: 4rem;
				.article-play{
					width: .88rem;
					height: .88rem;
					line-height: .88rem;
					border-radius: 50%;
					text-align: center;
					background-color: rgba(0,0,0,.4);
					.iconfont{
						padding-top: .08rem;
						padding-left: .08rem;
						font-size: .35rem;
						color: #f1f1f1;
					}
				}
				img{
					display: block;
					width: 100%;
					height: 100%;
					padding: .02rem;
					object-fit: cover;
				}
			}
			.article-footer{
				height: .6rem;
				line-height: .6rem;
				font-size: .24rem;
				color: #a3a3a3;
				span{
					margin-right: .1rem;
				}
				.article-remove{
					width: .45rem;
					height: .35rem;
					line-height: .35rem;
					margin-top: .125rem;
					text-align: center;
					border: .02rem solid @borderColor;
					border-radius: .08rem;
					.iconfont{
						font-size: .24rem;
					}
				}
			}
		}
	}
	.multiple-img{
		flex: 1;
	}
</style>-->
