<template>
    <div class="wendaList-wrap">
      <top @hrefTo="this.$Tool.goBack">
        <template slot="title">{{ '真相问答' }}</template>
      </top>
      <div class="wendaList">
        <div class="wendaList-current">
          <h2 class="title">{{newList.title}}</h2>
          <div class="desc" >
            <p class="desc-text">{{newList.description}}</p>
            <!--<div class="open" v-show="openShow">
              <p>展开 <i class="iconfont icon-arrow-down"></i></p>
            </div>-->
          </div>

          <ul class="wendaList-img" v-show="imgShow">
            <li class="item" v-for="(item,index) in imgArr">
              <img :src="fileRoot + item">
            </li>
          </ul>
          <div class="wendaList-tip">
            <span>100</span>个回答
            <span class="point">•</span>
            <span>{{count}}</span>个收藏
          </div>
        </div>

        <div class="wendaList-other">
          <div class="header clearfix">
            <div class="header-user fl">
              <img src="@/assets/images/a.jpg" class="userPhoto">
              <span class="username">用户名用户已</span>
            </div>
            <div class="header-focus fr">
              关注
            </div>
          </div>
          <div class="body">
            <div class="body-content">
              <p class="content">水电费第三方军绿色快递放假克里斯多夫吉林省打开福建省打开了附近受得了福建省的脸孔福建省的脸孔发胶索拉卡打飞机受得了开发说服力抗衰老的飞机上来的咖啡机克鲁赛德建安费凉快圣诞节凉快圣诞节饭凉快圣诞节饭两款手机弗兰克萨就发了开始打家纺雷克萨就发了开始打解放路肯定是九分裤了电视剧付款了圣诞节弗兰克斯离开家施蒂利克福建省的脸孔积分离开的设计费凉快圣诞节饭离开的时间凉快圣诞节凉快圣诞节凉快圣诞节饭凉快圣诞节凉快圣诞节拉开距离会计法老是看得见</p>
              <ul class="body-img">
               <!-- <li class="body-item">
                  <img src="@/assets/images/a.jpg" alt="">
                </li>
                <li class="body-item">
                  <img src="@/assets/images/b.jpg" alt="">
                </li>
                <li class="body-item">
                  <img src="@/assets/images/b.jpg" alt="">
                </li>-->
              </ul>
            </div>
            <span class="body-read">4.4万阅读</span>
          </div>
          <div class="footer">
            <div class="item">
              <i class="iconfont icon-share"></i>
              <span>7</span>
            </div>
            <div class="item">
              <i class="iconfont icon-xiaoxi"></i>
              <span>7</span>
            </div>
            <div class="item">
              <i class="iconfont icon-weizan"></i>
              <span>7</span>
            </div>
          </div>
        </div>
      </div>
      <div class="wendaList-footer">
        <div class="item" @click="handleProCollection(id)" >
          <i class="iconfont" :class="{'icon-not-collection':collectToggle.notcollect,'icon-collected':collectToggle.collected}"></i>
          <span>{{collectState?'已收藏':'收藏'}}</span>
        </div>
        <div class="item" @click="$Tool.goPage({ name:'release',query:{title:'发起讨论',sort:3}})">
          <i class="iconfont icon-fabu"></i>
          <span>提问</span>
        </div>
        <div class="item" @click="handleAnswer">
          <i class="iconfont icon-comment"></i>
          <span>回答</span>
        </div>
      </div>

      <!--回答弹出框-->
      <div v-transfer-dom>
        <popup v-model="popObj.show" height="100%">
          <div class="popup-wrap">
            <div class="popup-header clearfix">
              <div class="header-cancel" @click="handleCancel">取消</div>
              <div class="header-title">回答</div>
              <div class="header-fabu" @click="handlePublish" :class="{fabuColor:fabuColor}">发布</div>
            </div>
            <div class="popup-body">
                <textarea
                  placeholder="分享你的真实观点和经验"
                  :onpropertychange="onpropertychange"
                  :oninput="oninput"
                  @input="handelInput"
                  v-model="record.content"></textarea>
                <div class="popup-img clearfix">
                  <div class="img fl" v-for="(item, index) in record_file">
                    <i class="iconfont icon-remove" @click.stop="handleRemoveImg(index)"></i>
                    <img :src="fileRoot + item.url">
                  </div>
                  <div class="popup-addimg fl" v-show="popObj.addShow">
                    <label for="addImg"></label>
                    <i class="iconfont icon-add"></i>
                    <input type="file" id="addImg" accept="image/*" multiple @change="handleuploadFile" style="display: none;">
                  </div>
                </div>
            </div>
            <div class="popup-footer clearfix" :class="{'nav-hide':hideClass}">
              <div class="keyboard fl">
                <i class="iconfont icon-jianpan-up"></i>
              </div>
              <div class="addImg fr">
                <label for="iconImg"></label>
                <i class="iconfont icon-album"></i>
                <input type="file" id="iconImg" accept="image/*" multiple @change="handleuploadFile" style="display: none;">
              </div>
            </div>
          </div>
        </popup>
      </div>
    </div>
</template>
<script>
  import config from '@/lib/config/config'
  import userService from '@/service/userService'
  import wdcollectService from '@/service/wdcollectService'
  import interService from '@/service/interlocutionService'
  import messageService from '@/service/messageService'
  import fileService from '@/service/fileService'
  import articleService from '@/service/articleService'
  import { TransferDom, Popup} from 'vux'
  export default {
    name: "wendaList",
    directives:{
      TransferDom,
    },
    components:{
      Popup
    },
    data(){
        return{
          docmHeight: document.documentElement.clientHeight,  //一开始的屏幕高度
          showHeight: document.documentElement.clientHeight,   //一开始的屏幕高度
          hideClass:false,
          timer:false,
          onpropertychange:"this.style.height=this.scrollHeight + 'px'",
          oninput:"this.style.height=this.scrollHeight + 'px'",
          fileRoot:config.fileRoot + '/',
          bigImg:false,
          collectState:false,
          wendaList:[],
          imgArr:[],
          newList:{},
          count:0,
          fabuColor:false,
          imgShow:true,
          id:0,
          page:1,
          parentid:'',
          answerList:[],
          collectToggle:{
            notcollect:true,
            collected:false
          },
          record:{
            content:'',
            author:1,
            type:1,
            publishtime:'',
            parentid:''
          },
          popObj:{
            show:false,
            addShow:false,
          },
          record_file:[]

        }
    },

    mounted(){
      // window.onresize监听页面高度变化
      window.onresize = () =>{
        return (()=>{
          window.screenHeight = document.body.clientHeight;
          this.showHeight = window.screenHeight;
        })()
      }
    },

    activated(){
      this.$nextTick(()=>{
        this.id = this.$route.query.id;
        this.newList = JSON.parse(this.$route.query.item);
        if(this.newList.images == null) {
          this.imgShow = false;
          return false;
        }else{
          this.imgShow = true;
        }
        this.imgArr = this.newList.images.split(',');
      });
    },

    methods:{
      init(){
        if(!this.id){
          this.$vux.alert.show({
            content:'获取出错，请返回！'
          });
          this.$Tool.goBack();
          return;
        }
        // 判断是否收藏
        wdcollectService.testWdCollect(this.id, (data)=>{
          if(data && data.status == 'success') {
            if(data.result == 1) {
              this.collectToggle.notCollect = false;
              this.collectToggle.collected = true;
            }else{
              this.collectToggle.notCollect = true;
              this.collectToggle.collected = false;
            }

          }
        });

        // 获取回答列表
        let pid =this.record.parentid;
        this.parentid = pid;
        let answerData = interService.getAnswers(this.page, 15,this.parentid);
        if(answerData && answerData.status == "success") {
          console.log(answerData)

        }

        //获取问题收藏数量
        wdcollectService.getWdCollectCount(this.id,(data)=>{
          if(data && data.status == "success") {
            this.count = data.count;
          }
        })
      },

      // 图片上传
      handleuploadFile(e){
        let file = e.target.files[0];
        if (!file) { return; }
        this.$vux.loading.show();
        let param = new FormData(); //创建form对象
        param.append('file',file,file.name);//通过append向form对象添加数据
        fileService.uploadPic(param,(data)=>{
          let obj = {};
          obj.url = data.result.url;
          obj.filename = data.result.filename;
          obj.type =1;
          this.record_file.push(obj);
        });
        this.$vux.loading.hide();
        // if(param.has.length >= 1){
        //   this.popObj.addShow = true;
        // }

      },

      //删除上传图片
      handleRemoveImg(item){
        const thiz = this;
        this.$vux.confirm.show({
          content:'确认删除图片?',
          onConfirm () {
            thiz.$vux.loading.show();
            setTimeout(()=>{
              thiz.record_file.splice(item,1);
              thiz.$vux.loading.hide();
              thiz.$vux.toast.show({
                text:'删除成功'
              });
            },600);
            if(thiz.record_file.length == 1){
              setTimeout(()=>{
                thiz.popObj.addShow = false;
              },600);
            }
          }
        });

      },
      // 收藏功能
      handleProCollection(wdid){
        if(!localStorage.id){this.$Tool.loginPrompt();return;}
        let data = wdcollectService.wdCollect(wdid);
        if(data && data.status == 'success') {
          if(data.result == 1) {
            /*this.$vux.toast.show({
              text:'收藏成功',
              type:'success'
            });*/
            //给发布人发送消息
            messageService.sendMessage(this.newList.userid,"collect",this.id,1);
            setTimeout(()=>{
              this.$vux.alert.hide();
            },1000);
            this.collectState = true;
            this.collectToggle.notcollect = false;
            this.collectToggle.collected = true;
          }else{
            /*this.$vux.toast.text('取消收藏', 'middle');
            setTimeout(()=>{
              this.$vux.alert.hide();
            },1000);*/
            this.collectState = false;
            this.collectToggle.notcollect = true;
            this.collectToggle.collected = false;
          }
        }
      },

      //弹出回答框
      handleAnswer(){
        this.popObj.show =true;
      },

      //取消回答框
      handleCancel(){
        this.popObj.show = false;
      },

      // 发布回答
      handlePublish(){
        if(!localStorage.id) {
          this.$vux.alert.show({
            content:"你还未登录呢，请先登录再回答问题哦"
          });
          return;
        }

        if(!this.$Tool.checkInput(this.record.content)) {
          this.record.content = this.$Tool.replaceNo(this.record.content);
          this.$vux.alert.show({
            content:'内容含有非法字符，已为您删除，请确认'
          });
          return;
        }

        if(!this.record.content){
          this.$vux.toast.text('回答不能为空', 'middle')
          return;
        }
        this.record.author = Number(localStorage.id || 0);
        let pid =this.newList.id;
        this.record.parentid = pid;
        let data = articleService.publishArticle(this.record, this.record_file);
        if(data && data.status == "success") {
          this.$vux.alert.show({
            content:'发布成功'
          });
          this.record_file = [];
          this.record.content ="";
          this.popObj.addShow=false;
          setTimeout(()=>{
            this.$vux.alert.hide();
          },800);
        }else{
          this.$vux.alert.show({
            content:'发布失败'
          });
        }

      },

      //监听文本框
      handelInput(){
        if(this.record.content.length >= 1){
          this.fabuColor = true;
        }else{
          this.fabuColor = false;
        }
      },
      // 检测屏幕高度变化
      inputType(){
        if(!this.timer) {
          this.timer = true;
          let that = this;
          setTimeout(()=>{
            if(that.docmHeight > that.showHeight) {
              // 显示class
              this.hideClass = true;
            }else if(that.docmHeight <= that.showHeight) {
              // 显示隐藏
              this.hideClass = false;
            }
            that.timer = false;
          },20)
        }
      }
    },
    watch:{
      id(){
        setTimeout(()=>{
          this.init();
        },450);
      },
      showHeight: 'inputType'
    }
  }
</script>

<style lang="less" scoped>
  .wendaList{
    position: relative;
    height: calc(100% - 1.5rem);
    overflow: hidden;
    overflow-y: auto;
    background-color: #ccc;
    .wendaList-current{
      padding: 0 .3rem;
      background-color: #fff;
      margin-bottom: .1rem;
      .title{
        padding: .15rem 0;
        font-size: .38rem;
        line-height: .58rem;
        letter-spacing: .02rem;
        overflow: hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:3;
      }
      .desc{
        position: relative;
        .desc-text{
          width: 100%;
          line-height: .48rem;
          font-size: .34rem;
        /*  overflow: hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:1;*/
          letter-spacing: .02rem;
          color: #707070;
        }
        /*.open{
          position: absolute;
          top: .08rem;
          right: 0;
          font-size: .34rem;
          color: #406599;
          .iconfont{
            font-size: .28rem;
          }
        }*/
      }
      .wendaList-img{
        width: 100%;
        margin: .2rem 0;
        .item{
          display: inline-block;
          width: 33%;
          height: 1.6rem;
          margin-bottom: .02rem;
          &:last-child{
            margin-right: 0;
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
            padding: .02rem;
            object-fit: cover;
          }
        }
        .bigImg{
          width: 100%;
          height: 4rem;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .wendaList-tip{
        line-height: .77rem;
        font-size: .32rem;
        letter-spacing: .02rem;
        color: #707070;
      }
    }
    .wendaList-other{
      padding: .2rem .3rem;
      background-color: #fff;
      .header{
        line-height: .72rem;
        .userPhoto{
          width: .72rem;
          height: .72rem;
          margin-right: .2rem;
          border-radius: 50%;
        }
        .username{
          font-size: .3rem;
          color: #000;
        }
        .header-focus{
          font-size: .34rem;
          font-weight: 700;
          letter-spacing: .02rem;
          color: #f85959;
        }
      }
      .body{
        margin: .2rem 0;
        .body-content{
          .content{
            overflow: hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:6;
            line-height: .5rem;
            font-size: .32rem;
            color: #222;
          }
        }
        .body-img{
          width:100%;
          .body-item{
            display: inline-block;
            width: 32.5%;
            height: 1.88rem;
            margin: .1rem 0;
            img{
              display: block;
              width: 100%;
              height: 100%;
              object-fit: cover;
              border: .02rem solid @borderColor;
            }
          }
        }
        .body-read{
          display: block;
          font-size: .28rem;
          color: #9b9b9b;
          line-height: .5rem;
        }
      }
      .footer{
        width: 100%;
        display: flex;
        .item{
          flex: 1;
          text-align: center;
          color: #000;
          .iconfont{
            font-size: .4rem;
            font-weight: 500;
          }
          span{
            font-size: .32rem;
            vertical-align: auto;
          }
        }
      }
    }
  }
  .wendaList-footer{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    background-color: #fff;
    border-top: .02rem solid @borderColor;
    .item{
      flex: 1;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: #000 ;
      .iconfont{
        font-size: .42rem;
      }
      .icon-not-collection{
        color: #000;
      }
      .icon-collected{
        color: #f9c345;
      }
      span {
        font-size: .32rem;
      }
      &:last-child{
        color: #d60139;
      }
    }
  }
  .popup-wrap{
    .popup-header{
      position: relative;
      left: 0;
      top: 0;
      height: .95rem;
      line-height: .95rem;
      padding: 0 .3rem;
      border-bottom: .02rem solid @borderColor;
      div{
        display: inline-block;
        font-size: .3rem;
        text-align: center;
      }
      .header-cancel,.header-fabu{
        width: 1rem;
      }
      .header-fabu{
        color: #c7c7c7;
      }
      .fabuColor{
        color:#2a90d7;
      }
      .header-title{
        width: calc(100% - 2.2rem);
        letter-spacing: .02rem;
        font-size: .32rem;
        color: #e86256;
      }
    }
    .popup-body{
      width: 100%;
      background-color: #fff;
      height: calc(100vh - 1.83rem);
      overflow: hidden;
      overflow-y: auto;
      padding: 0 .3rem;
      textarea{
        padding-top: .3rem;
        padding-bottom: .6rem;
        display: block;
        width: 100%;
        font-size: .3rem;
        resize: none;
        overflow-y: hidden;
        background-color: #fff;
      }
      .popup-img{
        padding: .2rem 0;
        .img{
          position: relative;
          margin-right: .12rem;
          margin-bottom: .12rem;
          display: inline-block;
          width: 2.22rem;
          height: 2.22rem;
          &:nth-child(3n){
            margin-right: 0;
          }
          img{
            display: block;
            width: 100%;
            height: 100%;
            border: .02rem solid @borderColor;
            filter: brightness(0.7);
            object-fit: cover;
          }
          .iconfont{
            position: absolute;
            z-index: 6;
            right: .09rem;
            top: .09rem;
            color: #fff;
          }
        }
        .popup-addimg{
          position: relative;
          width: 2.22rem;
          height: 2.22rem;
          text-align: center;
          background-color: #f4f5f6;
          float: left;
          label{
            position:absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            line-height: 1.86rem;
          }
          .iconfont{
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            font-size: 1rem;
            margin-top: .51rem;
            // font-weight: 700;
            color: #dcdcdc;
          }
        }
      }
    }
    .popup-footer{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: .88rem ;
      line-height: .88rem;
      padding: 0 .3rem;
      border-top: .02rem solid @borderColor;
      background-color: #f4f5f6;
      .addImg{
        position: relative;
        label{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
      .iconfont{
        font-size: .5rem;
        color: #444;
      }
    }
    .nav-hide {
      position: static!important;
    }
  }
</style>

<style>
  .vux-popup-dialog{
    background-color: #fff !important;
  }
</style>
