<template>
  <div>
    <top>
      <template slot="title">{{'问答详情'}}</template>
    </top>
    <div class="answer-detail">
      <div class="answer-wrap">
       <!-- 问题标题-&#45;&#45;回答数-->
        <div class="answer-header">
          <h1 class="question-title">
            这是当前问题的标题这是当前问题的标题这是当前问题的标题这是当前问题的标题这是当前问题的标题这是当前问题的标题
          </h1>
          <div class="answer-count">
            <span>6666条回答 <i class="iconfont icon-arrow-right"></i></span>
            <span style="display: none">暂无回答</span>
          </div>
        </div>
        <!--回答人的信息-->
        <div class="answer-info clearfix">
          <div class="answer-user fl">
            <img src="@/assets/images/about.png" alt="回答用户">
            <span>回答人用户名</span>
          </div>
          <div class="answer-focus fr">
            关注
          </div>
        </div>
        <!--问答内容-->
        <div class="answer-content">
          <p class="content-text">
            因为梦见你离开 我从哭泣中醒来
            看夜风吹过窗台 你能否感受我的爱
            等到老去那一天 你是否还在我身边
            看那些誓言谎言 随往事慢慢飘散
            多少人曾爱慕你年轻时的容颜
            可知谁愿承受岁月无情的变迁
            多少人曾在你生命中来了又还
            可知一生有你我都陪在你身边
            因为梦见你离开 我从哭泣中醒来
            看夜风吹过窗台 你能否感受我的爱
            等到老去那一天 你是否还在我身边
            看那些誓言谎言 随往事慢慢飘散
            多少人曾爱慕你年轻时的容颜
            可知谁愿承受岁月无情的变迁
            多少人曾在你生命中来了又还
            可知一生有你我都陪在你身边
            当所有一切都已看平淡
            是否有一种坚持还留在心
            多少人曾爱慕你年轻时的容颜
            可知谁愿承受岁月无情的变迁
            多少人曾在你生命中来了又还
            可知一生有你我都陪在你身边
            多少人曾爱慕你年轻时的容颜
            可知谁愿承受岁月无情的变迁
            多少人曾在你生命中来了又还
            可知一生有你我都陪在你身边
            可知一生有你我都陪在你身边
          </p>
          <div class="content-img">
            <div class="item">
              <img src="@/assets/images/login-header.png" alt="">
            </div>
            <div class="item">
              <img src="@/assets/images/login-header.png" alt="">
            </div>
            <div class="item">
              <img src="@/assets/images/login-header.png" alt="">
            </div>
          </div>
          <span class="content-time">创建时间2018.02.02</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "wendaDetail"
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
        background-color: #fff;
        .content-text{
          line-height: .65rem;
          font-size: .34rem;
        }
        .content-img{
          /*background-color: #000;*/
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
    }
  }
</style>
