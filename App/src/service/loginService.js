import config from '@/lib/config/config'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/zjzx-user/login';
const service ={};
const token = localStorage.getItem('token');


// 1.	获取验证码 (login)
service.getCode = function (mobile, call) {
  let params = {mobile};
  commonUtil.ajax(controller + '/getCode', params, call);
};

// 2.校验验证码  (login)
service.testCode = function (mobile, code) {
  let params = {mobile, code};
  let resData = commonUtil.ajaxAsync(controller + '/testCode', params);
  return resData;
};

// 3.手机号登录 (login)
service.loginByMobile = function (mobile, code, call) {
  let params = {
    mobile,
    code,
    device: 'mobile'
  };
  commonUtil.ajax(controller + '/loginByMobile', params, call);
};

// 4.用户登录（微信登录）(login)
service.loginByWx = function (params, call) {
  if(call) {
    commonUtil.ajax(controller + '/loginByWx', params, call);
    return;
  }
  let resData = commonUtil.ajaxAsync(controller + '/loginByWx', params);
  return resData;
};
// 5.用户登录（QQ登录）(login)
service.loginByQQ = function (params, call) {
  if(call) {
    commonUtil.ajax(controller + '/loginByQQ', params, call);
    return;
  }
  let resData = commonUtil.ajaxAsync(controller + '/loginByQQ', params);
  return resData;
};

// 6.用户登录（新浪微博登录）(login)
service.loginByXl = function (params, call) {
  if(call) {
    commonUtil.ajax(controller + '/loginByXl', params, call);
    return;
  }
  let resData = commonUtil.ajaxAsync(controller + '/loginByXl', params);
  return resData;
};

// 7.用户退出 (login)
service.logOut = function () {
  let params = {token};
  let resData = commonUtil.ajaxAsync(controller+'/logOut',params);
  return resData;
};

export default  service
