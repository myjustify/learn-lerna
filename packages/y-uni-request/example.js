import req from "@/utils/request.js";
let reqBody = new req();
// reqBody.beforeRequest = ({params,extra,curPage})=>{
// 	// reqBody.config.loading=true
// 	// extra.showLoading=false
// 	console.log('before')
// }
// reqBody.afterRequest = ()=>{
// 	console.log('after')
// }
// reqBody.failRequest = ()=>{
// 	console.log('fail')
// }
// reqBody.completeRequest = (res)=>{
// 	console.log(res)
// }
const api = {
	index(params={},extra={}){
		reqBody.request(params,extra)
	},
	clearCurPageReq(){
		reqBody.clearCurPageReq();
	}
}
module.exports = api;