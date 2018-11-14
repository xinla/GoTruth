<template>
    <div class="wenda-user">
      <div class="wenda-login" v-if="ifLogin">
        <div class="header-nologin">
          <span>马上登录</span>，参与回答
        </div>
        <ul class="body">
          <li class="item">
            <i class="iconfont icon-dati"></i>
            <span>答题</span>
          </li>
          <li class="item">
            <i class="iconfont icon-eye2"></i>
            <span>发现</span>
          </li>
        </ul>
      </div>
      <div class="wenda-login" v-if="isLogin">
        <div class="header-login clearfix">
          <div class="left fl">
            <img src="@/assets/images/header.jpeg">
            <span class="username">用户名</span>
          </div>
          <div class="right fr">
            我的问答
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </div>
        <ul class="body">
          <li class="item">
            <i class="iconfont icon-dati"></i>
            <span>答题</span>
          </li>
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
</template>

<script>
  export default {
    name: "wendaUser",
    data(){
      return{
        ifLogin:true,
        isLogin:false,
      }
    },
    activated(){
      this.$nextTick(()=>{

      });
    },
  }
</script>
<style lang="less" scoped>
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
</style>
