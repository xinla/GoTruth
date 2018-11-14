<template>
    <div class="answer-wrap">
      <div class="answer-header clearfix">
        <div class="answer-back fl">
          <i class="iconfont icon-arrow-left"></i>
        </div>
        <ul class="answer-menu fl">
          <li class="answer-item">
            邀请
          </li>
          <li class="answer-item">
            推荐
          </li>
        </ul>
        <div class="answer-search fr">
          <i class="iconfont icon-search"></i>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "answerSubject"
    }
</script>

<style lang="less" scoped>
  .answer-wrap{
    .answer-header{
      width: 100%;
      height: .74rem;
      line-height: .74rem;
      position: relative;
      top: 0;
      left: 0;
      border-bottom: .02rem solid @borderColor;
      .answer-back,.answer-search{
        width: .86rem;
        text-align: center;
        .iconfont{
          font-size: .36rem;
          color: #222;
        }
      }
      .answer-menu{
        width: calc(100% - 1.72rem);
        text-align: center;
        .answer-item{
          display: inline-block;
          margin-right: .7rem;
          font-size: .3rem;
          letter-spacing: .02rem;
          &:last-child{
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
