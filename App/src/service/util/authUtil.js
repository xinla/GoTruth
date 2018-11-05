var authUtil = {};

/**
 * 
 * @param {Object} type
 * 
 * 授权登录
 */
var auths={};

/**
 * 初始化
 */
authUtil.init = function(){
	plus.oauth.getServices(function(services){
		for(var i in services){
			var service=services[i];
			auths[service.id]=service;
			// console.log(service.id);
		}
			
	},function(e){
		console.log("获取登录认证失败："+e.message);
	});
}


/**
 * 授权登录 微信登录
 */
authUtil.loginByWx = function(call){
	
	var resMap = {};
	var result = {};
	resMap.result = result;

	var auth = auths['weixin'];
	if(!auth){
		console.log("授权失败");
		return;
	}
	auth.login(function(){
			// console.log("登录认证成功：");
			// console.log(JSON.stringify(auth.authResult));
			// {"openid":"oRrdQt6Rx5HoGnbKAgG_Wpl0zK44","scope":"snsapi_userinfo","refresh_token":"15_7154LP5HATQGV6dpH6oHLUxicB2hFNwXXMOPYhQgdzZRTjjHakfhejh9n5hQRX8KMGW7RfMfCwdP8aXaQm12f6YvIODe7LE2ZTKs8PMvoyY","code":"033DTL4d1x8dwt0xFw3d1s6B4d1DTL4N","unionid":"oU5YytwqdJBWqmL6dNXsjsYAS_MM","access_token":"15_6EC6T6cX3m0cAJA-FO2OJLvmwdfHoayP9KnOFi5p3mBTGsaauxe5sr5i3i_koQhKkpGRBJqQ8TIKmvlgFpLVG0mVb-lZxuqcJAOHjpDTRSI","expires_in":7200}
			
			// console.log("----- 获取用户信息 -----");
			auth.getUserInfo(function(){
				// console.log("获取用户信息成功：");
				// console.log(JSON.stringify(auth.userInfo));
				// {"openid":"oRrdQt6Rx5HoGnbKAgG_Wpl0zK44","city":"Chizhou","country":"China","nickname":"董春林","privilege":[],"language":"zh_CN","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/KRO0TRAmL5XvPXia9icPstUkNKMlHSYOdhiahX5UBbNuibOhZGcxZcsRxmQtAAqFX2nLL5cwyc4fkLVJnKibiaN1qzJg/132","unionid":"oU5YytwqdJBWqmL6dNXsjsYAS_MM","sex":1,"province":"Anhui"}
				var nickname=auth.userInfo.nickname||auth.userInfo.name||auth.userInfo.miliaoNick;
			//	plus.nativeUI.alert("欢迎“"+nickname+"”登录！");
				var userInfo = auth.userInfo; 
				var wx_user = {};
			
				if(userInfo.sex == 1){
					wx_user.sex = "男";
				}else if(userInfo.sex == 2){
					wx_user.sex = "女";
				}
				
				
				wx_user.wx_openid = userInfo.openid;
				wx_user.wx_nikname = userInfo.nickname;
				wx_user.wx_image = userInfo.headimgurl;
				wx_user.wx_unionid = userInfo.unionid;
				resMap.status = "success";
				result.wx_user = wx_user;
				if(call){
					call(resMap);
				}
				
				
			},function(e){
				console.log("获取用户信息失败：");
				console.log("["+e.code+"]："+e.message);
				//plus.nativeUI.alert("获取用户信息失败！",null,"登录");
				resMap.status = "error";
				result.e = e;
					if(call){
					call(resMap);
				}
				
			});
		},function(e){
			
			// console.log("登录认证失败：");
			// console.log("["+e.code+"]："+e.message);
			plus.nativeUI.alert("详情错误信息请参考授权登录(OAuth)规范文档：http://www.html5plus.org/#specification#/specification/OAuth.html",null,"登录失败["+e.code+"]："+e.message);
		});
	
	
	
	
}

/**
 * QQ 授权登录
 * @param {Object} call
 */
authUtil.loginByQQ = function(call){
	var resMap = {};
	var result = {};
	resMap.result = result;

	var auth = auths['qq'];
	if(!auth){
		console.log("授权失败");
		return;
	}
	auth.login(function(){
			console.log("登录认证成功：");
			console.log(JSON.stringify(auth.authResult));
			
			
			console.log("----- 获取用户信息 -----");
			auth.getUserInfo(function(){
				console.log("获取用户信息成功：");
				console.log(JSON.stringify(auth.userInfo));
				var nickname=auth.userInfo.nickname||auth.userInfo.name||auth.userInfo.miliaoNick;
			//	plus.nativeUI.alert("欢迎“"+nickname+"”登录！");
				var userInfo = auth.userInfo; 
				var qq_user = {};
				qq_user.qq_openid = auth.authResult.openid;
				qq_user.qq_nikname = userInfo.nickname;
				qq_user.qq_image = userInfo.headimgurl;
				qq_user.sex = userInfo.gender;
				resMap.status = "success";
				result.qq_user = qq_user;
				if(call){
					call(resMap);
				}
				
				
			},function(e){
				console.log("获取用户信息失败：");
				console.log("["+e.code+"]："+e.message);
				//plus.nativeUI.alert("获取用户信息失败！",null,"登录");
				resMap.status = "error";
				result.e = e;
					if(call){
					call(resMap);
				}
				
			});
		},function(e){
			
			console.log("登录认证失败：");
			console.log("["+e.code+"]："+e.message);
			plus.nativeUI.alert("详情错误信息请参考授权登录(OAuth)规范文档：http://www.html5plus.org/#specification#/specification/OAuth.html",null,"登录失败["+e.code+"]："+e.message);
		});
	
	
}


authUtil.loginByXl = function(call){
	var resMap = {};
	var result = {};
	resMap.result = result;

	var auth = auths['sinaweibo'];
	if(!auth){
		console.log("授权失败");
		return;
	}
	auth.login(function(){
			console.log("登录认证成功：");
			console.log(JSON.stringify(auth.authResult));
			
			
			console.log("----- 获取用户信息 -----");
			auth.getUserInfo(function(){
				console.log("获取用户信息成功：");
				console.log(JSON.stringify(auth.userInfo));
				var nickname=auth.userInfo.nickname||auth.userInfo.name||auth.userInfo.miliaoNick;
			//	plus.nativeUI.alert("欢迎“"+nickname+"”登录！");
				var userInfo = auth.userInfo; 
				var xl_user = {};
				
				if(userInfo.gender == 'm'){
					xl_user.sex = "男";
				}else if(userInfo.gender == 'f'){
					xl_user.sex = "女";
				}
				
				
				xl_user.xl_openid = auth.authResult.openid;
				xl_user.xl_nikname = userInfo.nickname;
				xl_user.xl_image = userInfo.headimgurl;
				resMap.status = "success";
				result.xl_user = xl_user;
				if(call){
					call(resMap);
				}
				
				
			},function(e){
				console.log("获取用户信息失败：");
				console.log("["+e.code+"]："+e.message);
				//plus.nativeUI.alert("获取用户信息失败！",null,"登录");
				resMap.status = "error";
				result.e = e;
					if(call){
					call(resMap);
				}
				
			});
		},function(e){
			
			console.log("登录认证失败：");
			console.log("["+e.code+"]："+e.message);
			plus.nativeUI.alert("详情错误信息请参考授权登录(OAuth)规范文档：http://www.html5plus.org/#specification#/specification/OAuth.html",null,"登录失败["+e.code+"]："+e.message);
		});
	
	
}


export default authUtil