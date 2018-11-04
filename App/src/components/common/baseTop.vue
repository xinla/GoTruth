<template>
	<div>
		<top @hrefTo="this.$Tool.goBack">
			<template slot="title">{{title}}</template>
		</top>
		 <transition :name="$store.state.transitionName">
		 	<keep-alive>
		        <router-view  class="router-view"></router-view> 
	     	</keep-alive>
		 	<!-- <keep-alive v-if="!$route.meta.keepAlive">
		        <router-view  class="router-view"></router-view> 
	     	</keep-alive>      
		      	<router-view v-else class="router-view"></router-view> -->
		</transition>
	</div>
</template>

<script>
export default{
	data(){
		return{
			title:'title',
			transitionName:''
		}
	},
	mounted(){
		this.title = this.$route.query.title;
	},
	activated(){
		this.title = this.$route.query.title;
	},
}
</script>

<style scoped>
	.hreficon{
		width: 30px;
	}
	.router-view {
		position: absolute;
		width: 100%;
		left: 0;
	    height: calc(100vh - 1.3rem) !important;
	    background: #f4f5f6;
		transition: transform .3s cubic-bezier(.55,0,.1,1);
	}
	/*.slide-left1-enter, .slide-right1-leave-active {
		transform: translate(200px, 0);
	}
	.slide-left1-leave-active, .slide-right1-enter {
		opacity: 0;
		transform: translate(-200px, 0);
	}*/
</style>