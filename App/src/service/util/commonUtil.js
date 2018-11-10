import netUitl from "./netUtil"
const util ={
	// test: controller+'/test'
}

util.ajaxAsync = function(url,params){
	let res = {};
	/*let res = {}
		net = {};
	try{
		net = netUtil.getNetInfo();					
	}catch(e){

	}
	if (net.network == "未连接网络") {
		res.status = "notnet";
		res.mes = "网络已断开"
		return res;
	}*/

	$.ajax({
		url: url,
		type: 'post',
		dataType: 'json',
		data: params,
		async:false,
		success:function(data){
			res = data;
		}
	})
	
	return res;

}
util.ajax = function(url,params,call){
	let res = {};
	/*let res = {},
		net = {};
	try{
		net = netUtil.getNetInfo();					
	}catch(e){

	}
	if (net.network == "未连接网络") {
		res.status = "notnet";
		res.mes = "网络已断开"
		if (call) {
			call(res);		
		}
		return;
	}*/
	$.post(url,params,function(data){
		if (call) {
			call(data);		
		}
	},"json");


}
export default util


