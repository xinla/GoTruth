<template>
  <div class="bfc-o" @click="handleGoDetail(wenda)">
    <div class="wenda-wrap">
      <div class="wenda-item clearfix">

        <!--标题-->
        <h2 class="wenda-title">{{wenda.title}}</h2>
        <!--多图-->
        <ul class="wenda-img-list">
          <li class="wenda-img" :class="{bigImg:bigImg}"   v-for="(item,index) in imgArr" v-if="index < 3" >
            <img :src=" fileRoot + item" alt="直击真相">
          </li>
        </ul>
        <!--问答底部-->
        <div class="wenda-footer clearfix">
          <div class="left fl clearfix">
            <span class="wenda-username">{{publisher}}</span>
            <span class="wenda-num">回答数目</span>
          </div>
          <div class="right fr">
            <i class="iconfont icon-remove"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import config from '@/lib/config/config'
import userService from '@/service/userService'
import interService from '@/service/interlocutionService'
export default {
  data(){
    return {
      // 服务路径
      fileRoot:config.fileRoot + '/',
      //发布人
      publisher:'',
      //图片Array
      imgList:[],
      imgArr:[],
      // createtime:"",
      page:1,
      bigImg:false,
    }
  },
  props:{
    wenda:{
      type: Object,
      default: {}
    },
    whi:{
      type: Number
    },
    // 是否删除
    ifDel:{
      type: Boolean,
      default: false
    }
  },
  mounted(){
    this.init();
  },
  watch:{
    wenda(){
      this.init();
    }
  },
  methods:{
    init() {
      // 获取发布人name
      userService.getUserById(this.wenda.userid, (data) =>{
        if(data && data.status == "success") {
          // console.log(data);
          this.publisher = data.result.user.username;
        }
      });
      // 获取发布时间
      // this.createtime = this.$Tool.publishTimeFormat(this.wenda.createtime);
      this.imgList = this.$Tool.extractImg(this.wenda.description,3);



      if(this.wenda.images == null) {
        return;
      }
      this.imgArr = this.wenda.images.split(',')
      if(this.imgArr.length == 1) {
        this.bigImg = true;
      }else{
        this.bigImg = false;
      }
    },
    handleGoDetail(item){
      if(!this.$store.state.isScolling) {
        this.$Tool.goPage({name:'wendaList',query:{id:this.wenda.id,item:item}});
        console.log(item)
      }
    }
  },
}
</script>
<style lang="less" scoped>
  .wenda-wrap{
    padding: 0 .3rem;
    background-color: #f3f4f5;
    .wenda-item {
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
      .float-img{
        width: 2rem;
        height: 1.3rem;
        margin-left: .3rem;
        float: right;
        img{
          display: block;
          width: 100%;
          height: 100%;
          line-height: 100%;
          color: #999;
          text-align: center;
          object-fit: cover;
          padding: .02rem;
          border: .02rem solid @borderColor;
        }
      }
      .wenda-img-list{
        display: flex;
        width: 100%;
        .wenda-img{
          height: 1.6rem;
          flex: 1;
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
      .wenda-footer{
        height: .72rem;
        line-height: .72rem;
        font-size: .26rem;
        color: #999;
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
  }
/*  .wenda-wrap{
    padding: 0 .3rem;
    background-color: #f3f4f5;
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
      !*三图*!
      .wenda-img-list{
        width: 100%;
        .wenda-item{
          width: 32.8%;
          height: 1.3rem;
          display: inline-block;
          margin-right: .055rem;

          border-radius: .04rem;
          &:last-child{
            margin-right: 0;
          }
          img{
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: .02rem solid @borderColor;
          }
        }
      }
      !*浮动图片*!
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
      !*底部大图*!
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
  }*/
</style>
