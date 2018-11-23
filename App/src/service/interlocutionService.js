import config from '@/lib/config/config'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/interlocution';
const service ={}

const userid = localStorage.getItem('id');
// 发布问题（讨论）
service.publishQuestion = function(record,images) {
	
	let params = {
		userid,
		title:record.title,//:"标题",
		description:record.content,//:"描述"
		images,//:"图片地址集合"  格式：url，url2,..........
		classify:record.classify//:"文章分类"
	};

	let res = commonUtil.ajaxAsync(controller+'/publishQuestion',params);
	return res;
}
// 问题列表
service.getQuestionPage = function(page,size,userid){
	let params = {
		page,//:"当前页",
		size,//:"分页大小"
		userid,//:"用户id"
	}
	// if (call) {
	// 	commonUtil.ajax(controller+'/getQuestionPage',params,call);
	// 	return;
	// }
	let resMap = commonUtil.ajaxAsync(controller+'/getQuestionPage',params);

	return resMap;
}

export default service
