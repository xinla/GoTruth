import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/user';
const service ={}

const token = localStorage.getItem('token');
const userid =  localStorage.getItem('id');

//获取手机验证码
service.getCode = function(mobile,call){
	// debugger;
	axios.get(controller+'/getCode',{params:{
		mobile:mobile
	}}).then(function(res){
		call(res.data);
	})
}

//手机号登录
service.loginByMobile = function(mobile,code,call){

	axios.get(controller+'/loginByMobile',{params:{
		mobile:mobile,
		code:code
	}}).then(function(res){
		call(res.data);
		// console.log(res.data);
	}).catch(function(error){
		console.log(error);
	})
}
//微信登录
service.loginByWx = function(params,call) {
	
	/*var params = {
		wx_openid,//:"微信标识",
		wx_nikname,//:"微信昵称",
		wx_image,//:"微信头像地址",
		wx_unionid,//:"微信uid"
	};*/
	if (call) {
		commonUtil.ajax(controller+'/loginByWx',params,call);
		return;
	}
	var resUserInfo = commonUtil.ajaxAsync(controller+'/loginByWx',params);

	return resUserInfo;
}
// QQ登录
service.loginByQQ = function(params,call) {
	
	/*var params = {
		qq_openid,//:"qq标识",
		qq_nikname,//:"qq昵称",
		qq_image,//:"qq头像地址"
	};*/
	if (call) {
		commonUtil.ajax(controller+'/loginByQQ',params,call);
		return;
	}
	var resUserInfo = commonUtil.ajaxAsync(controller+'/loginByQQ',params);

	return resUserInfo;
}
//新浪登录
service.loginByXl = function(params,call) {
	
	/*var params = {
		xl_openid,//:"新浪微博标识",
		xl_nikname,//:"新浪昵称",
		xl_image,//:"新浪头像地址"
	};*/
	if (call) {
		commonUtil.ajax(controller+'/loginByXl',params,call);
		return;
	}
	var resUserInfo = commonUtil.ajaxAsync(controller+'/loginByXl',params);

	return resUserInfo;
}
//获取用户的信息
service.getUserById = function(targetuserid,call) {
	
	var params = {
		token:token || 13,
		userid:userid || 13,
		targetuserid,
	};
	if (call) {
		commonUtil.ajax(controller+'/getUserById',params,call);
		return;
	}
	var resUserInfo = commonUtil.ajaxAsync(controller+'/getUserById',params);

	return resUserInfo;
}

//更新用户信息
service.updateUser = function(user) {
	// debugger;
	let params = {
		token,
		userid,
		record: JSON.stringify(user)
	}
	let userMap = commonUtil.ajaxAsync(controller+'/updateUser',params);

	return userMap;
}

service.getCurentUser = function(call){

	var resMap = service.getUserById(userid,call);

	return resMap;
}

//用户退出
service.logOut = function(){
	let logid = localStorage.getItem('logid');
	let params = {
		logid,
		token,
		userid,
	}
	let resLogOut = commonUtil.ajaxAsync(controller+'/logOut',params);

	return resLogOut;
}
/**
 * 判断用户名是否存在
 * @param  {[type]} username [description]
 * @return {status:"success" exist:"是否存在"  0:不存在，1:存在}
 */
service.testUserName = function(username){
	let params = {
		username,
	}
	let resMap = commonUtil.ajaxAsync(controller+'/testUserName',params);

	return resMap;
}
/**
 * 判断手机号是否注册
 * @param  {[type]} username [description]
 * @return {status:"success" exist:"是否存在"  0:不存在，1:存在}
 */
service.testMobile = function(mobile){
	let params = {
		mobile,
	}
	let resMap = commonUtil.ajaxAsync(controller+'/testMobile',params);

	return resMap;
}
export default service

