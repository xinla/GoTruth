<template>
    <div class="wenda-user">
        <div class="wenda-login" v-if="!ifLogin">
            <router-link class="header-nologin"  :to="{path:'/topBase/login',query:{title:'用户登录'}}" tag="div">
                <span>马上登录</span>，参与回答
            </router-link>
        </div>
        <div class="wenda-login" v-if="ifLogin">
            <div class="header-login clearfix">
                <div class="left fl">
                    <img :src="userPhoto">
                    <span class="username">{{userName}}</span>
                </div>
                <div class="right fr">
                    <router-link :to="{path:'/personBase/publishedQA',query:{current:3}}">
                        我的问答
                        <i class="iconfont icon-arrow-right"></i>
                    </router-link>
                </div>
            </div>
            <ul class="body">
                <!-- <router-link class="item" :to="{path:'answerSubject'}" tag="li">
                   <i class="iconfont icon-dati"></i>
                   <span>答题</span>
                 </router-link>-->
                <li class="item" @click="$Tool.goPage({ name:'release',query:{title:'发表问题',sort:3}})">
                    <i class="iconfont icon-tiwen"></i>
                    <span>提问</span>
                </li>
                <li class="item" @click="$Tool.goPage({ name:'published',query:{userId,current:0} })">
                    <i class="iconfont icon-morentouxiang"></i>
                    <span>个人中心</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import userService from '@/service/userService'
    export default {
        data(){
            return {
                ifLogin:false,
                //当前用户名
                userName:'',
                //当前用户头像
                userPhoto:'',
                userId:localStorage.id,
            }
        },
        activated() {
            this.$nextTick(()=>{
                let token = localStorage.getItem('token');
                //判断是否登录
                if(!token) {
                    this.ifLogin = false;
                    return;
                }

              if(localStorage.id && localStorage.id == this.userId){
                this.userPhoto = localStorage.userImg;
                this.userName = localStorage.userName;
              }
              let res = userService.getUserById(this.userId);
              if(res && res.status == "success") {
                this.userPhoto = this.$Tool.headerImgFilter(res.result.user.imageurl);
                this.userName = res.result.user.username;
              }
                // this.userPhoto = localStorage.userImg;

                this.ifLogin = true;
            })
        }

    }
</script>

<style lang="less" scoped>
    .wenda-login{
        background-color: #fff;
        margin-bottom: .1rem;
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
            padding: .24rem .3rem;
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
                .iconfont{
                    position: relative;
                    top: .02rem;
                    left: -.08rem;
                }
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
                .icon-morentouxiang{
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
