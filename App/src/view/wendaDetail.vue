<template>
  <div>
    <top>
      <template slot="title">{{'问答详情'}}</template>
    </top>
    <div class="answer-detail" @scroll="loadScroll">
      <div class="answer-wrap">
       <!-- 问题标题-&#45;&#45;回答数-->
        <div class="answer-header">
          <h1 class="question-title">{{wenda.title}}</h1>
          <div class="answer-count">
            <span>{{answerCount}}条回答 <i class="iconfont icon-arrow-right"></i></span>
          </div>
        </div>
        <!--回答人的信息-->
        <div class="answer-info clearfix">
          <div class="answer-user fl">
            <img :src="$Tool.headerImgFilter(answerUser.imageurl)" alt="回答用户">
            <span>{{ answerUser.username}}</span>
          </div>
          <div class="answer-focus fr" @click="handleAnswerFocus(answer.author, 1)">
            {{answerFocusState ? '已关注' : '关注'}}
          </div>
        </div>
        <!--问答内容-->
        <div class="answer-content">
          <p class="content-text">
           {{answer.content}}
          </p>
          <div class="content-img">
            <div class="item" v-for="item in answerFile" :key="item.id">
              <img :src="fileRoot + item.url">
            </div>
          </div>
          <span class="content-time">创建时间 {{publishtime}}</span>
        </div>
        <!--问答评论-->
        <div class="answer-comment">
          <div class="header clearfix">
            <span class="fl" v-if="ifComment">评论 {{answerCommentNum}}</span>
            <span class="fl" v-else style="color: #406599; font-weight: 700;">抢鲜评论</span>
            <span class="fr" v-if="ifZan">赞 {{answerZanNum}}</span>
            <span class="fr" v-else>抢鲜点赞</span>
          </div>
          <div class="body" v-for="(item, index) in commentList">
            <div class="comment-item clearfix">
              <img :src="$Tool.headerImgFilter(item.imageurl)" class="comment-userPhoto fl">
              <div class="comment-wrap fl">
                <div class="comment-header clearfix">
                  <span class="username fl">{{item.username}}</span>
                  <div class="comment-zan fr" :class="{'likeActive': item.ifLike}" @click="handleFabulous(2, item.id, index)">
                    <like :likeStatus="index == curLike ? ifLike: 0"></like>
                    <span class="zan-count">{{item.likeNum}}</span>
                  </div>
                </div>
                <div class="comment-body">
                  <p class="comment-content">{{item.content}}</p>
                  <div class="comment-open">展开全文</div>
                </div>
                <div class="comment-footer clearfix">
                  <div class="footer-left fl">
                    <span class="comment-time">{{$Tool.publishTimeFormat(item.commenttime)}}</span>
                    <span class="comment-point">•</span>
                    <span class="comment-reply">
                      <var>120</var>回复
                    </span>
                  </div>
                  <span class="footer-right fr" v-if="item.douserid == currentId" @click="handleDeleteComment(item.id,index,1)">删除</span>
                </div>
              </div>
            </div>
          </div>
          <prompt-blank v-if="proFail2" :mes="failMes2"></prompt-blank>
          <load-more :show-loading="false" :tip="loadText" v-show="ifLoadMore"></load-more>
        </div>

      </div>
    </div>
    <!--伪评论框-->
    <div class="answer-tabBar clearfix">
      <div class="answer-input fl" @click="handleOpenInput">
        <i class="iconfont icon-comment"></i>
        <span>写评论...</span>
      </div>
      <div class="answer-icon fr">
        <div class="item-icon msg-icon" @click="handleToComment">
          <i class="iconfont icon-xiaoxi1"></i>
          <span class="answer-badge" v-show="badgeShow">{{answerCommentNum}}</span>
        </div>
        <div class="item-icon">
          <i class="iconfont icon-not-collection"></i>
        </div>
        <div class="item-icon" @click="handleFabulous(1)">
          <i class="iconfont icon-weizan" :class="zanIcon ? 'icon-yizan' : 'icon-weizan'"></i>
        </div>
        <div class="item-icon">
          <i class="iconfont icon-share"></i>
        </div>
      </div>
    </div>
    <!--评论弹出框-->
    <div v-transfer-dom class="answer-transfer">
      <popup v-model="answerPopObj.show" style="z-index: 588;">
        <div class="popup-wrap">
          <div class="popup-area">
            <textarea
              :placeholder="answerPopObj.placeholder"
              v-model.trim="answerPopObj.desc"
              @input="handleDescInput"
              ref="answerPopFocus"></textarea>
          </div>
          <div class="popup-btn clearfix">
            <button type="button" class="popup-cancel fl" @click="handleCancelInput">取消</button>
            <button type="button" class="popup-send fr" :class="{active:answerPopObj.active}" @click="handleSendComment">发布</button>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import config from '@/lib/config/config'
  import like from '@/components/common/like'
  import articleService from '@/service/articleService'
  import interService from '@/service/interlocutionService'
  import userService from '@/service/userService'
  import followService from '@/service/followService'
  import messageService from '@/service/messageService'
  import articleFileService from '@/service/article_fileService'
  import articleCommentService from '@/service/article_commentService'
  import praiseService from '@/service/praiseService'
  import listUtil from '@/service/util/listUtil'
  export default {
    name: "wendaDetail",
    components:{
      like
    },
    data(){
      return{
        id:0, //回答id
        currentId:localStorage.id,    //当前登录用户
        loadLock: false,  //加载锁
        fileRoot:config.fileRoot + '/',   //服务路径
        wenda:{}, //问题的对象
        answer:{},  //回答对象
       /* 回答人的姓名-头像*/
        answerUser:{
          username:'',
          imageurl:''
        },
        answerCount:0,    //回答数
        answerFocusState: false,  //回答人关注状态
        commentFocusState: false,    //评论人关注状态
        answerFile:[],  //回答内容中图片数组
        publishtime:'',   //回答时间
        answerCommentNum: 0,  //回答评论总数
        ifComment:false,    //是否有评论
        answerZanNum: 0,    //回答点赞总数
        ifZan: false,   //是否有点赞
        // 评论框对象
        answerPopObj:{
          show:false,
          desc:'',
          placeholder:'请文明发言，遵守评论规则...',
          active:false
        },
        /*类型：评论(1) | 回复(1)*/
        commentType: 1,
        commentPage:1,  //加载评论分页
        proFail1:false,
        proFail2:false,
        failMes1:"获取内容失败",
        failMes2:"获取评论失败",
        loadText:'正在加载...',
        ifLoadMore: false, //评论是否加载更多,
        commentList:[],   //评论列表数组
        likeNum: 0,   //问答点赞数
        ifLike: false,  //点赞动画
        commentIndex: -1,   //指定评论数组中某条评论的索引值 //展开评论回复是顶部当前索引使用
        replyCommentId:Number,    //回复评论的Id
        replyUserId:Number,     //回复评论人的id
        likeStatus: false,    //点赞状态
        zanIcon: false,   //伪评论框回答点赞状态
        curLike:Number,   //点赞数字变化
        badgeShow: false, //伪评论框消息是否显示badge

      }
    },
    activated(){
      this.wenda = JSON.parse(this.$route.query.wenda);
      this.answer = JSON.parse(this.$route.query.item);
      this.id = this.answer.id;
    },
    watch:{
      id(){
        this.ifLoad = true;
        setTimeout(()=>{
          this.init();
          this.ifLoad = false;
        },delay)
      }
    },
    methods:{
      init(){
        if (!this.id) {
          this.$vux.alert.show({
            content: '获取出错，请返回！',
          });
          this.$Tool.goBack();
          return;
        }
        this.ifLoad = true;
        // 获取问题回答数量
        interService.getAnswerCount(this.wenda.id, (data) =>{
          if(data && data.status == "success") {
            this.answerCount = this.$Tool.numConvertText(data.count);
          }
        });

        // 获取回答人的信息
        let answerInfo = userService.getUserById(this.answer.author);
        if(answerInfo && answerInfo.status == "success") {
          this.answerUser = answerInfo.result.user;
        }

        // 获取关注的状态
        if(localStorage.getItem('token')) {
          followService.testFollow(this.answer.author, (data)=>{
            if(data && data.status == "success") {
              if(data.result == 1) {
                this.answerFocusState =true;
              }else{
                this.answerFocusState = false;
              }
            }
          })
        }
        // 获取回答内容中图片
        let answerSrcData = articleFileService.getFileByArticle(this.answer.id);
        if(answerSrcData && answerSrcData.status == "success") {
          this.answerFile = answerSrcData.result.filelist;
        }

        // 获取发布回答时间
        this.publishtime = this.$Tool.publishTimeFormat(this.answer.publishtime);

        // 获取评论回答总数
        articleCommentService.getArticleCommentCount(this.answer.id, (data)=>{
          if(data && data.status == "success") {
            this.answerCommentNum = this.$Tool.numConvertText(data.result.count);
            if(this.answerCommentNum == 0){
              this.ifComment = false;
              this.badgeShow = false;
            }else{
              this.ifComment = true;
              this.badgeShow = true;
            }
          }
        });

        // 获取回答点赞状态
        praiseService.testPraise(this.answer.id, 1, (data)=>{
          if(data && data.status == "success") {
            if (data.result == 1){
              this.zanIcon = true;
            }else{
              this.zanIcon = false;
            }
          }
        });
        // 获取回答点赞总数
        praiseService.getPraiseCount(this.answer.id,1,(data)=>{
          if(data && data.status == "success") {
            this.answerZanNum = this.$Tool.numConvertText(data.result.count);
            if(this.answerZanNum == 0){
              this.ifZan = false;
            }else{
              this.ifZan = true;
            }
          }
        });
        //评论滚动近底部，自动加载 一屏1080
        this.loadComment();
        this.ifLoad = false;
      },

      /*关注  | 取消关注   type: 1-回答发布人 || 2-回答评论人*/
      handleAnswerFocus(userid, type){
        if(!localStorage.id) {
          this.$Tool.loginPrompt();
          return;
        }
        followService.doFollow(userid, (data)=>{
          if(data && data.status == "success") {
            if(type == 1) {
              if(data.result == 1) {
                this.$vux.toast.show({
                  text:'关注成功'
                });
                this.answerFocusState = true;
                // 向回答人发送消息
                messageService.sendMessage(userid, "focus", this.answer.id, 1);
              }else{
                this.$vux.toast.show({
                  text:'取消关注'
                });
                this.answerFocusState = false;
              }
            }
          }

        })
      },
      /*type: 1-回答点赞 || 2-评论点赞*/
      handleFabulous(type, itemid, index) {
        if(!localStorage.id) {
          this.$Tool.loginPrompt();
          return;
        }
        if(type == 1) {
          let zanData = praiseService.doPraise(this.answer.id,1);
          if(zanData && zanData.status == "success") {
            if(zanData.result.code == 1) {
              this.zanIcon = true;
              this.likeNum ++;
              // 给发布人发送消息
              messageService.sendMessage(this.answer.author, "like", this.answer.id, 1);
            }else{
              this.zanIcon = false;
              this.likeNum --;
            }
          }
        }else{
          let zanData = praiseService.doPraise(itemid,2);
          if(zanData && zanData.status == "success") {
            if(zanData.result.code == 1) {
              this.curLike = index;
              this.ifLike = true;
              this.commentList[index].likeNum ++;
              this.commentList[index].ifLike = true;
              // 给评论人发送消息
              messageService.sendMessage(this.replyUserId, "like", this.replyCommentId, 2);
            }else{
              this.curLike = index;
              this.ifLike = false;
              this.commentList[index].likeNum --;
              this.commentList[index].ifLike = false;
            }
            if(zanData.result.count <= 0) {

            }
          }
        }
      },
      // 打开评论框
      handleOpenInput(){
        this.inputShow();
        this.answerPopObj.placeholder = "请文明发言，遵守评论规则...";
      },
      // 取消评论框
      handleCancelInput(){
        this.answerPopObj.show = false;
      },
      // 评论框输入事件
      handleDescInput(){
        if(this.answerPopObj.desc) {
          this.answerPopObj.active = true;
        }else{
          this.answerPopObj.active = false;
        }
      },
      // 发布评论
      handleSendComment(){
        this.badgeShow = true;
        if(!this.answerPopObj.desc) {
          this.answerPopObj.show = false;
          return;
        }
        if(!localStorage.id) {
          this.$Tool.loginPrompt();
          return;
        }
        let currentUserid = localStorage.id;  //当前用户id
        if(this.answerPopObj.desc && this.$Tool.checkInput(this.answerPopObj.desc)) {
          if(this.commentType == 1) {
            //发送评论
            let commentData = articleCommentService.articleComment(this.answer.id,this.answerPopObj.desc,currentUserid,this.answer.author,1);

            if(commentData && commentData.status == "success") {

              this.loadLock = false;
              this.commentPage = 1;
              this.loadComment();
              this.answerPopObj.show = false;
              this.answerPopObj.desc = "";
              this.answerPopObj.active = false;
              this.answerCommentNum ++;
              if(this.answerCommentNum >= 0){
                this.ifComment = true;
              }
                this.$vux.toast.show({
                  type:'success',
                  text:'评论成功'
                });
              // 给发布人发送消息
              messageService.sendMessage(this.answer.author,"reply", this.answer.id, 1);
              let dis = $('.answer-detail').scrollTop() + $('.content-time').offset().top - 100;
              $('.answer-detail').animate({scrollTop:dis},100);

            }else{
              this.$vux.alert.show({
                content:'评论失败，请重试！'
              });
              setTimeout(()=>{
                this.$vux.alert.hide();
              });
            }
          }
        }else{
          this.$vux.alert.show({
            content:"内容不合法，请修改后提交"
          });
          setTimeout(()=>{
            this.$vux.alert.hide();
          },1000)
         }
      },
      //删除评论
      handleDeleteComment(itemid, index, type){
        let thiz = this;

        this.$vux.confirm.show({
          content: "确认删除评论?",
          onConfirm(){
            thiz.$vux.loading.show();
            let deleteData = articleCommentService.deleteArticleConmon(itemid);
            if(deleteData && deleteData.status == "success") {
              setTimeout(()=>{
                if(type == 1) {
                  thiz.commentList.splice(index, 1);
                  thiz.answerCommentNum --;
                  thiz.$vux.loading.hide();
                  thiz.$vux.toast.show({
                    text:'删除成功'
                  });
                  if(thiz.commentList.length == 0) {
                    thiz.proFail2 = true;
                    thiz.ifLoadMore = false;
                    thiz.ifComment = false;
                    thiz.badgeShow = false;
                  }

                }else{
                  thiz.replyList.splice(index,1);
                  thiz.commentList[thiz.commentIndex].replyCount --;
                  thiz.$vux.loading.hide();
                  thiz.$vux.toast.show({
                    text:'删除成功'
                  });
                  let resReplyList = articleCommentService.getReplyList(thiz.replyCommentId,1,10);

                }
              },500);
            }
          }
        });
      },
      //消息图标滚动
      handleToComment(){
        let dis = $(".answer-detail").scrollTop() + $(".content-time").offset().top -100;
        $(".answer-detail").animate({scrollTop:dis},100);
      },
      /*评论框  显示---获取焦点*/
      inputShow(){
        this.answerPopObj.show = true;
        this.$refs.answerPopFocus.focus();
      },
      //加载评论
      loadComment(){
        // 获取回答一级评论列表
        this.ifLoadMore = true;
        let answerCommentList = articleCommentService.getArticleCommentPage(this.answer.id,this.commentPage,10);
        if(answerCommentList && answerCommentList.status == "success") {
          if(this.commentPage == 1) {
            this.commentList = [];
          }
          listUtil.appendList(this.commentList, answerCommentList.list.list);
          listUtil.asyncSetListPropty(answerCommentList.list.list,(item) =>{
            // 获取问答一级评论人信息
            let answerUserInfo = userService.getUserById(item.douserid);
            if(answerUserInfo && answerUserInfo.status == "success") {
              this.$set(item, "imageurl", answerUserInfo.result.user.imageurl);
              this.$set(item, "username", answerUserInfo.result.user.username);
            }

            // 获取问答一级评论回复数量
            let answerReplyCount = articleCommentService.getReplyCount(item.id);
            if(answerReplyCount && answerReplyCount.status == "success") {
              this.$set(item, 'replyCount', answerReplyCount.result.count);
            }

            // 获取问答一级评论点赞数量
            let answerZanCount = praiseService.getPraiseCount(item.id, 2);
            if(answerZanCount && answerZanCount.status == "success") {
              this.$set(item,"likeNum",answerZanCount.result.count);
            }

            // 获取用户是否给问答一级评论点赞的状态
            let answerTestZan = praiseService.testPraise(item.id, 2);
            if(answerTestZan && answerTestZan.status == "success") {
              if(answerTestZan.result == 1) {
                this.$set(item, "ifLike", true);
              }else {
                this.$set(item, "ifLike", false);
              }
            }
          });

          if(this.commentList.length == 0) {
            this.loadLock = true;
            this.proFail2 = true;
            this.failMes2 = "暂无评论，来抢第一个沙发吧";
            this.ifLoadMore = false;
          }else if(this.commentList.length < 10 || this.answerCommentNum.length) {
            this.loadLock = true;
            this.ifLoadMore = true;
            this.proFail2 = false;
            this.loadText = "已加载全部";
          }else{
            this.commentPage ++;
          }
        }else{
          this.proFail2 = true;
        }

      },
      // 页面加载渲染函数
      loadScroll(){
        let detailParent = $(".answer-detail").scrollTop() + $(".answer-detail").height();
        let detailChild = $(".answer-detail")[0].scrollHeight-350;
        if(!this.loadLock && detailParent > detailChild) {
          this.loadComment();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .answer-detail{
    position: relative;
    height: calc(100% - 1.5rem);
    overflow: hidden;
    overflow-y: auto;
    padding: 0 .3rem .88rem .3rem;
    background-color: #fff;
    .answer-wrap{
      .answer-header{
        padding-top: .4rem;
        color: #222;
        .question-title{
          font-size: .4rem;
          line-height: .58rem;
          letter-spacing: .02rem;
          overflow: hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:3;
        }
        .answer-count{
          line-height: .8rem;
        }
      }
      .answer-info{
        margin: .3rem 0;
        height: .8rem;
        .answer-user{
          display: flex;
          line-height: .8rem;
          img{
            display: block;
            width: .72rem;
            height: .72rem;
            margin-top: .04rem;
            margin-right: .23rem;
            border-radius: 50%;
          }
        }
        .answer-focus{
          width: 1.16rem;
          height: .56rem;
          line-height: .56rem;
          text-align: center;
          border-radius: .1rem;
          margin-top: .12rem;
          letter-spacing: .04rem;
          background-color: #f85959;
          color: #fff;
        }
      }
      .answer-content{
        padding-bottom: .5rem;
        background-color: #fff;
        .content-text{
          line-height: .65rem;
          font-size: .34rem;
        }

        .content-img{
          margin: .4rem 0;
          .item{
            display: inline-block;
            width: 3.375rem;
            height: 3.375rem;
            margin-right: .06rem;
            margin-bottom: .06rem;
            &:nth-child(2n){
              margin-right: 0;
            }
            img{
              display: block;
              width: 100%;
              height: 100%;
              border: .02rem solid @borderColor;
              object-fit: cover;
            }
          }
        }
        .content-time{
          line-height: .5rem;
          font-size: .32rem;
          color: #999;
        }
      }
      .answer-comment{
        background-color: #fff;
        .header{
          height: .88rem;
          line-height: .88rem;
          font-size: .3rem;
          border-bottom: .02rem solid @borderColor;
        }
        .body{
          padding-top: .26rem;
          background-color: #fff;
          .comment-item{
            padding-bottom: .26rem;
            .comment-userPhoto{
              display: block;
              width: .66rem;
              height: .66rem;
              margin-right: .25rem;
              border-radius: 50%;
            }
            .comment-wrap{
              width: calc(100% - .91rem);
              .comment-header{
                height: .66rem;
                line-height: .66rem;
                font-size: .24rem;
                .username{
                  font-size: .3rem;
                  color: #406599;
                }
                .comment-zan{
                  span{
                    font-size: .32rem;
                  }

                }
              }
              .comment-body{
                padding-top: .1rem;
                .comment-content{
                  line-height: .45rem;
                  font-size: .32rem;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  display:-webkit-box;
                  -webkit-box-orient:vertical;
                  -webkit-line-clamp:4;
                }
                .comment-open{
                  text-align: right;
                  line-height: .6rem;
                  color: #1674e9;
                }
              }
              .comment-footer{
                line-height: .4rem;
                font-size: .28rem;
                padding: .2rem 0;
                color: #222;
                .comment-reply{
                  padding: .1rem .2rem;
                  border-radius: .3rem;
                  color: #666;
                  background-color: #f1f1f1;
                  var{
                    margin-right: .04rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .answer-tabBar{
    width: 100%;
    height: .88rem;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 566;
    padding: 0 .3rem;
    background-color: #fafafa;
    border-top: .02rem solid #d8d8d8;
    .answer-input{
      width: 2.32rem;
      height: .57rem;
      line-height: .57rem;
      margin-top: .155rem;
      padding-left: .26rem;
      padding-right: .13rem;
      border: .02rem solid @borderColor;
      border-radius: .3rem;
      background-color: #f3f4f5;
      .icon-comment{
        padding-right: .14rem;
        color: #222;
      }
    }
    .answer-icon{
      display: flex;
      line-height: .88rem;
      .item-icon{
        margin-right: .48rem;
        .iconfont{
          font-size: .42rem;
        }
        .icon-yizan{
          color: #f85959;
        }
        &:last-child{
          margin-right: 0;
        }
      }
      .msg-icon{
        position: relative;
        .icnfont{
          position: absolute;
          left: -.56rem;
        }
        .answer-badge{
          display: block;
          position: absolute;
          top: .12rem;
          left: .1rem;
          line-height: .3rem;
          padding: 0.02rem .1rem;
          border-radius: .18rem;
          font-size: .2rem;
          background-color: @mainColor;
          transform: scale(.6);
          color: #fff;
        }
      }
    }
  }
  .popup-wrap{
    width: 100%;
    padding: .2rem;
    background-color: #f4f4f4;
    .popup-area {
      width: 100%;
      height: 1.8rem;
      margin-bottom: .2rem;
      textarea{
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: .02rem solid @borderColor;
        border-radius: .2rem;
        padding: .13rem .18rem;
        font-size: .28rem;
        resize:  none;
        &::-webkit-input-placeholder{color:#999;}
        &:-moz-placeholder{color:#999;}
        &::-moz-placeholder{color:#999;}
        &:-ms-input-placeholder{color:#999;}
      }
    }
    .popup-btn{
      button{
        width: 1.2rem;
        height: .6rem;
        border: .02rem solid transparent;
        border-radius: .2rem;
      }
      .popup-cancel{
        border-color: #dadada;
        background-color: #f4f4f4;
        color: #808080;
      }
      .popup-send{
        background-color: #dadada;
        color: #fff;
      }
      .active{
        background-color: #f85959;
      }
    }
  }
  .likeActive{
    color: #f40;
  }
</style>
