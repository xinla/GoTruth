<template>
	<div class="invite ac">
		<div class="iconfont icon-share" @click="showShare"></div>
		<pre class="invite-title">
扫描二维码，注册登录
即可邀请好友一起看真相！
（自动绑定您的邀请码）
		</pre>
		<canvas class="qr-code cc" ref="QRCode"></canvas>
		<share :content="shareDesc" v-model="shareShow"></share>
	</div>
</template>

<script>
import config from '@/lib/config/config'
import QRCode from 'qrcode'
// import share from '@/components/common/share'
export default {
	components:{
		// share,
	},
	data(){
		return {
			// inviteCode:localStorage.inviteCode || 1,
			shareDesc:{},
			shareShow:false,
			url:config.domain + '/#/login?inviteCode=' + (localStorage.inviteCode || 1)
		}
	},
	mounted(){
		// this.inviteCode = localStorage.inviteCode || 1;
		// this.url = config.domain + '/#/login?inviteCode=' + this.inviteCode;
		this.creatQRCode();
	},
	methods:{
		//动态生成二维码
	    creatQRCode(){ 
	      	//生成的二维码内容，添加变量
			let canvas = this.$refs.QRCode;
	        QRCode.toCanvas(canvas, this.url, function (error) {
	        // if (error) console.error(error);
	        })
	    },
	    showShare(){
			this.shareShow = true;
	    	this.shareDesc = {
				href:this.url,
				title: '邀你进入直击真相',
				content: '进入直击真相，为好友助力，为大爱助力',
				thumbs:'@/assets/images/logo.png'
			};
	    }
	},
}
</script>

<style scoped>
	#qr-code{
	    width: 90%!important;
	    height: auto!important;
  	}
  	.invite-title{
  		margin: 1rem 0;
  		line-height: 24px;
  	}
  	.invite {
  		min-height: 500px;
  	}
  	.cc{
  		position: fixed;
  	}
  	.icon-share{
	    position: absolute;
	    display: inline-block;
	    top: -0.7rem;
	    right: 0.3rem;
	    font-size: 0.46rem;
	    font-weight: 500;
  	}
</style>