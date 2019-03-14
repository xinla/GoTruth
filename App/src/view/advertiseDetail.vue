<template>
	<div class="">
		<top>
      <template slot="title">{{ '广告详情' }}</template>
    </top>
    <div v-html="advertise.content"></div>
	</div>
</template>

<script>
import advertService from '@/service/advertService'

export default {
	data() {
		return {
			advertiseId:undefined,
			advertise:{
				content:''
			}
		}
	},
	watch: {
		advertiseId() {
			let res = advertService.getAdvertById(this.advertiseId)
			console.log(res)
			this.advertise = res.record
		}
	},
	beforeRouteEnter(to, from, next) {
   next(vm => {
     vm.advertiseId = to.query.advertiseId
   })
  },
}
</script>

<style type="text/css" scoped="">
	
</style>