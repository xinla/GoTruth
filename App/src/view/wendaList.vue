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
            <span>200</span>个收藏
          </div>
          <div class="wendaList-collect" @click="handleProCollection(id)">
            <i class="iconfont icon-star"></i>
            收藏问题
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
                <li class="body-item">
                  <img src="@/assets/images/a.jpg" alt="">
                </li>
                <li class="body-item">
                  <img src="@/assets/images/b.jpg" alt="">
                </li>
                <li class="body-item">
                  <img src="@/assets/images/b.jpg" alt="">
                </li>
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
      
      </div>
    </div>

</template>
<script>
  import config from '@/lib/config/config'
  import userService from '@/service/userService'
  import wdcollectService from '@/service/wdcollectService'
  import interService from '@/service/interlocutionService'

  export default {
    name: "wendaList",
    data(){
        return{
          fileRoot:config.fileRoot + '/',
          bigImg:false,
          wendaList:[],
          imgArr:[],
          newList:{},
          imgShow:true,
          id:0,
          page:1,
          answerList:[]

        }
    },

    mounted(){
    },

    activated(){
      this.$nextTick(()=>{
        this.id = this.$route.query.id;
        this.newList = this.$route.query.item;
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
            console.log(data)
          }
        });

        // 获取回答列表
        let data = interService.getAnswers(this.page, 15);
        if(data && data.status == "success") {
          console.log(data.recordPage)

        }
      }
    },
    watch:{
      id(){
        setTimeout(()=>{
          this.init();
        },450);
      }
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
      .wendaList-collect{
        padding: .2rem 0;
        border-top: .02rem solid @borderColor;
        text-align: center;
        font-size: .35rem;
        color: #406599;
        .iconfont{
          font-size: .38rem;
        }

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
</style>
