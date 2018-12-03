<template>
    <div class="wendaList-wrap">
      <top @hrefTo="this.$Tool.goBack">
        <template slot="title">{{ '真相问答' }}</template>
      </top>
      <div class="wendaList">
        <div class="wendaList-current">
          <h2 class="title">{{wenda.title}}</h2>
          <div class="desc" >
            <p class="desc-text">{{wenda.description}}</p>
          </div>

          <ul class="wendaList-img">
            <li class="item" :class="{bigImg:bigImg}"  v-for="(item,index) in imgArr" v-show="ifImgNull">
              <img :src="fileRoot + item">
            </li>
          </ul>
          <div class="wendaList-tip">
            <span v-show="questionBool.hasAnswer">{{wendaCount}}条回答</span>
            <span v-show="questionBool.notAnswer">暂无回答</span>
            <span class="point">•</span>
            <span v-show="questionBool.hasCollect">{{collectCount}}人收藏</span>
            <span v-show="questionBool.notCollect">暂无人收藏</span>
          </div>
        </div>
        <div class="wendaList-other" v-for="(item,index) in answer">
          <div class="header">
            <div class="header-user">
              <img :src="$Tool.headerImgFilter(wendaUser.imageurl)" class="userPhoto">
              <span class="username">{{ wendaUser.username}}</span>
            </div>
          </div>
          <div class="body">
            <div class="body-content">
              <p class="content">{{item.content}}</p>
              <ul class="body-img">
                <li class="body-item" v-for="(item,index) in answerFile">
                  <img :src="fileRoot + item.url">
                </li>
              </ul>
            </div>
          </div>
          <div class="footer">
            <div class="item" @click="handleAnswerCollect(item.id)">
              <i class="iconfont" :class="answerIcon ? 'icon-collected' : 'icon-not-collection'"></i>
              <span v-show="answerBool.hasCollect">{{answerCount}}</span>
              <span v-show="answerBool.notCollect">收藏</span>
            </div>
            <div class="item">
              <i class="iconfont icon-xiaoxi"></i>
              <span v-show="answerBool.hasComment">7</span>
              <span v-show="answerBool.notComment">评论</span>
            </div>
            <div class="item">
              <i class="iconfont icon-weizan"></i>
              <span v-show="answerBool.hasZan">7</span>
              <span v-show="answerBool.notZan">点赞</span>
            </div>
          </div>
        </div>
       </div>
      <div class="wendaList-footer">
        <div class="item" @click="handleCollect">
          <i class="iconfont" :class="collectIcon ? 'icon-collected' : 'icon-not-collection'"></i>
          <span>{{collectState?'已收藏':'收藏'}}</span>
        </div>
        <div class="item" @click="$Tool.goPage({ name:'release',query:{title:'发表问题',sort:3}})">
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
        <popup v-model="answerObj.show" height="100%">
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
                  <div class="popup-addimg fl" v-show="answerObj.addShow">
                    <label for="addImg"></label>
                    <i class="iconfont icon-add"></i>
                    <input type="file" id="addImg" accept="image/*" multiple @change="handleuploadFile" style="display: none;">
                  </div>
                </div>
              <div class="popup-footer clearfix">
               <!-- <div class="keyboard fl" @click="handelBoard">
                  <i class="iconfont icon-jianpan-up"></i>
                </div>-->
                <div class="addImg fr">
                  <label for="iconImg"></label>
                  <i class="iconfont icon-album"></i>
                  <input type="file" id="iconImg" accept="image/*" multiple @change="handleuploadFile" style="display: none;">
                </div>
              </div>
            </div>
          </div>
        </popup>
      </div>
    </div>
</template>
<script>
  import config from '@/lib/config/config'
  import listUtil from '@/service/util/listUtil'
  import userService from '@/service/userService'
  import wdcollectService from '@/service/wdcollectService'
  import articleCollectService from '@/service/articleCollectService'
  import interService from '@/service/interlocutionService'
  import messageService from '@/service/messageService'
  import fileService from '@/service/fileService'
  import articleService from '@/service/articleService'
  import articleFileService from '@/service/article_fileService'

  export default {
    data() {
      return {
        collectIcon:false,
        id:0,   //问题Id
        wenda:{},    //问题对象
        answer:[],   //问题回答对象
        fileRoot:config.fileRoot + '/',   //服务路径
        imgArr:[],  //问题图片
        answerFile:[],    //回答附件图片列表
        bigImg:false,      //判断是否一张图
        ifImgNull:false,   //判断问题是否有图片
        wendaCount:0,     //回答数
        collectCount:0,   //问题收藏数
        collectIcon:false,   //监听收藏图标变化
        collectState: false, //收藏文字变化
        answerCount:0 ,   //回答收藏数
        answerIcon:false, //监听回答收藏图标变化
        /*问题的收藏回答状态*/
        questionBool:{
          hasAnswer:false,
          notAnswer:false,
          hasCollect:false,
          notCollect:false
        },
        /*问题的收藏-评论-点赞状态*/
        answerBool:{
          hasCollect:false,
          notCollect:false,
          hasComment:false,
          notComment:false,
          hasZan:false,
          notZan:false,
        },
        answerObj:{
          show:false,
          addShow:false
        },
        //textarea高度变化
        onpropertychange:"this.style.height=this.scrollHeight + 'px'",
        oninput:"this.style.height=this.scrollHeight + 'px'",
        fabuColor:false,    //发布按钮颜色
        record:{
          content:'',
          author:1,
          type:1,
          publishtime:'',
          parentid:''
        },
        record_file:[],   //问答附件数组
        page:1,     //回答列表页数
        // 答案发布人name-img
        wendaUser:{
          username:'',
          imageurl:''
        },

      }
    },
    mounted(){
      setTimeout(()=>{
        this.init();        
      },100)
    },
    activated() {
      this.id = this.$route.query.id;
      this.wenda = JSON.parse(this.$route.query.item);
      this.ifImgNull = true;
      if(this.wenda.images == null) {
        this.ifImgNull = false;
        return false;
      }else{
        this.ifImgNull = true;
      }
      this.imgArr = this.wenda.images.split(',');

      if(this.imgArr.length == 1) {
        this.bigImg = true;
      }else{
        this.bigImg = false;
      }
    },
    watch:{
      wenda(){
        this.init();
      }
    },
    methods:{
      //页面初始化渲染
      init() {
        if (!this.id) {
          this.$vux.alert.show({
            content: '获取出错，请返回！',
          });
          this.$Tool.goBack();
          return;
        }
        // 获取回答列表
        let answerData = interService.getAnswers(this.page, 15, this.id);
        if(answerData && answerData.status == "success") {
          listUtil.appendList(this.answer,answerData.recordPage.list);
          this.page++;
        }

        // 获取发布回答用户的信息
        listUtil.asyncSetListPropty(answerData.recordPage.list, (item)=> {
          let wendaUserData = userService.getUserById(item.author);
          if(wendaUserData && wendaUserData.status == "success") {
            this.wendaUser = wendaUserData.result.user;
          }
          // 获取发布回答的图片
          let answerSrcData = articleFileService.getFileByArticle(item.id);
          if(answerSrcData && answerSrcData.status == "success") {
            this.answerFile = answerSrcData.result.filelist;
          }

        });
        // 获取问题回答数量
        interService.getAnswerCount(this.wenda.id, (data) =>{
          if(data && data.status == "success") {
            this.wendaCount = this.$Tool.numConvertText(data.count);
            if(data.count <= 0) {
              this.questionBool.notAnswer = true;
              this.questionBool.hasAnswer = false;
            }else{
              this.questionBool.notAnswer = false;
              this.questionBool.hasAnswer = true;
            }
          }
        });
        //获取问题的收藏状态
        wdcollectService.testWdCollect(this.id, (data)=>{
          if(data && data.status == "success") {
            if(data.result == 1) {
              this.collectIcon = true;
              this.collectState = true;
            }else{
              this.collectIcon = false;
              this.collectState = false;
            }
          }
        });
        // 获取问题收藏数量
        wdcollectService.getWdCollectCount(this.wenda.id,(data)=>{
          if(data && data.status == "success") {
            this.collectCount = data.count;
            if(data.count <= 0) {
              this.questionBool.notCollect = true;
              this.questionBool.hasCollect = false;
            }else{
              this.questionBool.notCollect = false;
              this.questionBool.hasCollect = true;
            }
          }
        });

        // 获取回答的收藏状态
        articleCollectService.testCollect(this.id,(data)=>{
          if(data && data.status == "success") {
            if(data.result == 1) {
              this.answerIcon = true;
            }else{
              this.answerIcon = false;
            }
          }
        });

        // 获取回答收藏数量
        articleCollectService.getUserArticleCollectCount(this.id,(data) =>{
          if(data && data.status == "success") {
            this.answerCount = data.count;
            if(data.count <= 0) {
              this.answerBool.notCollect = true;
              this.answerBool.hasCollect = false;
            }else{
              this.answerBool.notCollect = false;
              this.answerBool.hasCollect = true;
            }
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
        if(this.record_file.length >= 0){
          this.answerObj.addShow = true;
        }
        this.$vux.loading.hide();
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
                thiz.answerObj.addShow = false;
              },600);
            }
          }
        });

      },

      // 收藏问题
      handleCollect(){
        if(!localStorage.id) {
          this.$Tool.loginPrompt();
          return;
        }
        let data = wdcollectService.wdCollect(this.wenda.id);
        if(data && data.status == "success") {
          if(data.result == 1) {
            messageService.sendMessage(this.wenda.author,"collect",this.id,1);
            this.collectIcon = true;
            this.collectState = true;
            this.collectCount++;
            if(this.collectCount > 0) {
              this.questionBool.hasCollect = true;
              this.questionBool.notCollect = false;
            }
          }else{
            this.collectIcon = false;
            this.collectState = false;
            this.collectCount--;
            if(this.collectCount <= 0) {
              this.questionBool.hasCollect = false;
              this.questionBool.notCollect = true;
            }
          }
        }
      },

      // 收藏回答
      handleAnswerCollect(item){
        if(!localStorage.id) {
          this.$Tool.loginPrompt();
          return;
        }
        console.log(item);
        return;
        let data = articleCollectService.articleCollect(item);
        if(data && data.status == "success") {
          if(data.result == 1) {
            messageService.sendMessage(this.answer.author,"collect",this.id,1);
            this.answerIcon = true;
            this.answerCount++;
            if(this.answerCount > 0) {
              this.answerBool.hasCollect = true;
              this.answerBool.notCollect = false;
            }
          }else{
            this.answerIcon = false;
            this.answerCount--;
            if(this.answerCount <= 0) {
              this.answerBool.hasCollect = false;
              this.answerBool.notCollect = true;
            }
          }
        }

      },
      //弹出回答框
      handleAnswer(){
        this.answerObj.show =true;
      },

      //取消回答框
      handleCancel(){
        this.answerObj.show = false;
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
        let pid =this.wenda.id;

        this.record.parentid = pid;
        let data = articleService.publishArticle(this.record, this.record_file);
        if(data && data.status == "success") {
          this.$vux.alert.show({
            content:'发布成功'
          });
          this.record_file = [];
          this.record.content ="";
          this.answerObj.addShow=false;
          this.wendaCount++;
          if(this.wendaCount > 0) {
            this.questionBool.hasAnswer = true;
            this.questionBool.notAnswer = false;
          }
          setTimeout(()=>{
            this.$vux.alert.hide();
          },800);
          this.answerObj.show = false;
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

    },
  }


/*  export default {
    directives:{
      TransferDom,
    },
    components:{
      Popup
    },
    data(){
        return{
          onpropertychange:"this.style.height=this.scrollHeight + 'px'",
          oninput:"this.style.height=this.scrollHeight + 'px'",
          fileRoot:config.fileRoot + '/',
          bigImg:false,
          collectState:false,
          wendaList:[],
          imgArr:[],
          newList:{},
          wendaFile:[],
          count:0,
          fabuColor:false,
          imgShow:true,
          id:0 ,
          page:1,
          parentid:'',
          collectToggle:{
            notcollect:true,
            collected:false
          },
          wendaUser:{
            username:'',
            imageurl:''
          },
          record:{
            content:'',
            author:1,
            type:1,
            publishtime:'',
            parentid:''
          },
          answerObj:{
            show:false,
            addShow:false,
          },
          record_file:[],
          ifNew:false,

        }
    },
    props:{
      wenda:Object,
      whi:{
        type:Number,
        default:0,
      },
      //判断是否显示发布人
      ifPublisher:{
        type:Boolean,
        default:true,
      },
      ifDel:false,
    },

    mounted(){
    },

    activated(){
      this.$nextTick(()=>{
        this.id = this.$route.query.id;
        this.newList = JSON.parse(this.$route.query.item);
        this.init();
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
       /!* if(!this.id){
          this.$vux.alert.show({
            content:'获取出错，请返回！'
          });
          this.$Tool.goBack();
          return;
        }*!/
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

        //获取问题收藏数量
        wdcollectService.getWdCollectCount(this.id,(data)=>{
          if(data && data.status == "success") {
            this.count = data.count;
          }
        });

        //获取回答列表
        let answerData = interService.getAnswers(this.page, 15, this.id);
        if(answerData && answerData.status == "success") {
          listUtil.appendList(this.wendaList,answerData.recordPage.list)
          this.page++;
        }

        // 获取发布回答人信息

        listUtil.asyncSetListPropty(answerData.recordPage.list, (item)=> {
          let wendaUserData = userService.getUserById(item.author);
          if(wendaUserData && wendaUserData.status == "success") {
            this.wendaUser = wendaUserData.result.user;
          }
        });
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
        if(this.record_file.length >= 0){
          this.answerObj.addShow = true;
        }
        this.$vux.loading.hide();
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
                thiz.answerObj.addShow = false;
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
            /!*this.$vux.toast.show({
              text:'收藏成功',
              type:'success'
            });*!/
            //给发布人发送消息
            messageService.sendMessage(this.newList.userid,"collect",this.id,1);
            setTimeout(()=>{
              this.$vux.alert.hide();
            },1000);
            this.collectState = true;
            this.collectToggle.notcollect = false;
            this.collectToggle.collected = true;
          }else{
            /!*this.$vux.toast.text('取消收藏', 'middle');
            setTimeout(()=>{
              this.$vux.alert.hide();
            },1000);*!/
            this.collectState = false;
            this.collectToggle.notcollect = true;
            this.collectToggle.collected = false;
          }
        }
      },

      //弹出回答框
      handleAnswer(){
        this.answerObj.show =true;
      },

      //取消回答框
      handleCancel(){
        this.answerObj.show = false;
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
          this.answerObj.addShow=false;
          setTimeout(()=>{
            this.$vux.alert.hide();
          },800);
          this.answerObj.show = false;
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
    },
  /!*  watch:{
      id(){
        setTimeout(()=>{
          this.init();
        },450);
      },
    }*!/
  }*/
</script>

<style lang="less" scoped>
  .wendaList{
    position: relative;
    height: calc(100% - 2.38rem);
    overflow: hidden;
    overflow-y: auto;
    background-color: #f3f4f5;
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
      padding: .2rem .3rem .6rem .3rem;
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
        /*.body-read{
          display: block;
          font-size: .28rem;
          color: #9b9b9b;
          line-height: .5rem;
        }*/
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
          .icon-not-collection{
            color: #000;
          }
          .icon-collected{
            color: #f9c345;
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
  }
</style>

<style>
  .vux-popup-dialog{
    background-color: #fff !important;
  }
</style>
