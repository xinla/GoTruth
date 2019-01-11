<template>
    <div @scroll="loadMore">
        <question
                v-for="(item,index) in wendaList"
                :wenda="item"
                :whi="index"
                :ifPublisher="false"
                :ifDel="ifDel"
                @delete="deleteWenda"
                :key="index">
        </question>
        <prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
        <load-more :show-loading="ifLoad"></load-more>
    </div>
</template>

<script>
    import interService from '@/service/interlocutionService'
    export default {
        data(){
            return {
                userId:localStorage.id || 0,
                wendaList:[],
                proMes:'',
                proIf:false,
                page:1,
                lock:false,
                ifLoad:false,
            }
        },
        activated(){
            setTimeout(()=>{
                this.userId = this.$route.query.userId;
                this.page = 1;
                this.wendaList = [];
                this.init();
            },delay)
            // 延迟时间必须大于路由切换动画时间
        },
        methods:{
            init(){
                this.proIf = false;
                this.lock = true;
                this.ifLoad = true;
                let wendaData = interService.getQuestionPage(this.page,10,null,this.userId);
                if(wendaData && wendaData.status == "success") {
                    if(wendaData.recordPage.list.length) {
                        this.page++;
                        this.wendaList = this.wendaList.concat(wendaData.recordPage.list);
                        console.log(this.wendaList)
                    }else if(this.wendaList.length == 0) {
                        this.proIf = true;
                        this.proMes = "您想要的真相消失啦~~~";
                    }
                }else{
                    this.proIf = true;
                    this.proMes = "请求失败，请稍后再试！";
                }
                this.lock = false;
                this.ifLoad = false;
            },
            deleteWenda([id,whi]){
                this.$vux.confirm.show({
                    content:"确定删除这条问答吗?",
                    onConfirm:()=>{
                        let data = interService.deleteQuestion(id);
                        if(data && data.status == "success"){
                            this.wendaList.splice(whi,1);
                            this.$vux.alert.show({
                               content:"删除成功"
                            });
                            setTimeout(()=>{
                               this.$vux.alert.hide();
                            },1000);
                        }else{
                            this.$vux.alert.show({
                                content:'删除失败，请重试！',
                            })
                        }


                    }
                });
            },
            loadMore(e){
                if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
                    this.init();
                }
            },

        },
        computed:{
            ifDel(){
                return (localStorage.id == this.userId);
            }
        }
    }
</script>

<style rel="stylesheet" scoped>
    .editor{
        color: #aaa;
        line-height: 40px;
        padding:0 0.3rem;
        border-bottom: 0.02rem solid #e8e8e8;
    }
    .deleteAll{
        border: 0.02rem solid #e8e8e8;
        border-radius: 8px;
        padding: 2px 6px;
    }
    .icon-delete{
        font-size: 18px;
    }
</style>
