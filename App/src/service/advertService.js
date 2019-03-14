import config from '@/lib/config/config'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer + '/zjzx-advert/advert'

export default {

	/**
   * [广告详情]
   * @param  {[type]} id [”广告标识”]
   * @return {[type]}    [description]
   */
  getAdvertById(id, call) {

  	var params = {
  		id	
		}

		if(call){
			commonUtil.ajax(controller + '/getAdvertById', params, call)
			return
		}

		var resMap = commonUtil.ajaxAsync(controller + '/getAdvertById', params)
		return resMap
  },

  /**
   * [获取app内嵌广告]
   * @param  {[type]} id [当前广告id]
   * @return {[type]}    [description]
   */
  getNextAdvert(curentid, call) {

  	var params = {
  		curentid	
		}

		if(call){
			commonUtil.ajax(controller + '/getNextAdvert', params, call)
			return
		}

		var resMap = commonUtil.ajaxAsync(controller + '/getNextAdvert', params)
		return resMap
  }

}
