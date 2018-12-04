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
        <!--问答评论-->
        <div class="answer-comment">
          <div class="header clearfix">
            <span class="fl">评论 888</span>
            <span class="fr">赞 666</span>
          </div>
          <div class="body">
            <div class="comment-item clearfix">
              <img src="@/assets/images/about.png" class="comment-userPhoto fl" alt="用户名">
              <div class="comment-wrap fl">
                <div class="comment-header clearfix">
                  <sapn class="username fl">评论人用户名</sapn>
                  <div class="comment-zan fr">
                    <i class="iconfont icon-weizan"></i>
                    <span class="zan-count">666</span>
                  </div>
                </div>
                <div class="comment-body">
                  <p class="comment-content">
                    我在二环路的里边 想着 你在远方的山上春风十里 今天的风吹向你 下了雨 我说所有的酒 都不如你 我在鼓楼的夜色中 为你唱花香自来 在别处 沉默相遇和期待 飞机飞过 车水马龙的城市 千里之外 不离开 把所有的春天 都揉进了一个清晨 把所有停不下的言语变成秘密 关上了门 莫名的情愫啊 请问 谁来将它带走呢 只好把岁月化成歌 留在山河 我在鼓楼的夜色中 为你唱花香自来 在别处 沉默相遇和期待 飞机飞过 车水马龙的城市 千里之外 不离开 把所有的春天 都揉进了一个清晨 把所有停不下的言语变成秘密 关上了门 莫名的情愫啊 请问 谁来将它带走呢 只好把岁月化成歌 留在山河 把所有的春天 都揉进了一个清晨 把所有停不下的言语变成秘密 关上了门
                  </p>
                  <div class="comment-open">展开全文</div>
                </div>
                <div class="comment-footer clearfix">
                  <div class="footer-left fl">
                    <span class="comment-time">2012.02.02</span>
                    <span class="comment-point">•</span>
                    <span class="comment-reply">回复</span>
                  </div>
                  <span class="footer-right fr">删除</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--问答输入框-->
        <div class="answer-tabBar clearfix">
          <div class="answer-input fl">
            <i class="iconfont icon-comment"></i>
            <span>写评论...</span>
          </div>
          <div class="answer-icon fr">
            <div class="item-icon msg-icon">
              <i class="iconfont icon-xiaoxi1"></i>
              <span class="answer-badge">100</span>
            </div>
            <div class="item-icon">
              <i class="iconfont icon-not-collection"></i>
            </div>
            <div class="item-icon">
              <i class="iconfont icon-weizan"></i>
            </div>
            <div class="item-icon">
              <i class="iconfont icon-share"></i>
            </div>
          </div>
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
                  color: #222;
                  .iconfont{
                    position: relative;
                    left: .2rem;
                    font-size: .4rem;
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
              display: inline-block;
              position: absolute;
              top: .12rem;
              line-height: .3rem;
              padding: 0.02rem .1rem;
              border-radius: .18rem;
              font-size: .2rem;
              background-color: @mainColor;
              transform: scale(.55);
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
