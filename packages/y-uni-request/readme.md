`import req from "y-uni-request";  
let reqBody = new req();  
reqBody.beforeRequest = ({params,extra,curPage})=>{  
	// reqBody.config.loading=true  
	// extra.showLoading=false  
	params.url = "http://localhost:8888/index.php"  
	// console.log('before')  
}  
reqBody.afterRequest = ({ res,resolve,reject,params,extra })=>{  
	resolve(res)  
}  
// reqBody.failRequest = ({ err,resolve,reject,params,extra })=>{  
// 	console.log('fail')  
// }  
// reqBody.completeRequest = ({ res,resolve,reject,params,extra })=>{  
// 	console.log(res)  
// }  
const api = {  
	index(params={},extra={}){  
		return reqBody.request(params,extra)  
	},  
	clearCurPageReq(){  
		reqBody.clearCurPageReq();  
	}  
}  
module.exports = api;`  