// 基础库1.4.0微信已经将并发10的限制去掉
// 延迟的请求需带上当前页面路由
// this.$api.index({})
// setTimeout(()=>{
// 	this.$api.index({},{ curPage,stopType:1 })
// },2000)
class req {
	constructor(params={}) {
		// reqIds "页面路径": new Set()  Set存页所有请求(请求中)
		this.reqIds = {};
		// reqWait{ curPage:'',fn: fn}
		this.reqWait =[];
		// 各个页面需要loading的请求数量 "页面路径": 0
		this.loadings = {};
		// 400毫秒后如果请求没结束 loding提示
		this.startLoadingTime = 400;
	}
	/*
	* extra.stopType 请求是否能被终止 0正常模式可被终止 1不可被终止
	* extra.requestType request uploadFile 网络请求或者上传文件
	*/
	request(params={},extra={}){
		extra = { requestType:'request',stopType:0,takeTk:true,baseParams:true,complatePath: false,showLoading: true,loadingText:'',toastFail: true,toastErr: false,...extra }
		let isRequest = extra.requestType=='request'
		let dataName = isRequest?'data':'formData'
		let dataType = isRequest?{ method:'POST',dataType:'json',responseType:'text' }:{}
		let header = isRequest?{ "content-type": "application/json" }:{}
		params = { [dataName]:{},...dataType,...params }
		params.header = { ...header,...params.header };
		let routes = this.getCurPageRoutes()
		let curPage = extra.curPage||routes.reverse()[0]
		if(!routes.includes(curPage)&&extra.stopType!=1){
			console.log(curPage+"页面已被卸载,请求未发出",params,extra)
			return;
		}
		return new Promise((resolve,reject)=>{
			
			this.beforeRequest&&this.beforeRequest({params,extra,curPage})
			// console.log(this.config)
			// 对loading统一管理
			if (extra.showLoading){
				if(!this.loadings[curPage]) this.loadings[curPage] = 0;
				this.loadings[curPage] = this.loadings[curPage]+1;
				// startLoadingTime毫秒后如果请求没结束 loding提示
				setTimeout(()=>{
					if(this.loadings[curPage]==1){
						uni.showLoading({ title:extra.loadingText||"加载中...",mask:true })	
					}
				},this.startLoadingTime)
			}
			let id = uni[extra.requestType]({
				...params,
				success:(res)=> {
					this.afterRequest&&this.afterRequest({res,resolve,reject,params,extra})
				},
				fail:(err)=> {
					this.failRequest&&this.failRequest({err,resolve,reject,params,extra})
				},
				complete:(res)=> {
					if (extra.showLoading) {
						this.loadings[curPage] = this.loadings[curPage] - 1;
						if(this.loadings[curPage]==0){
							uni.hideLoading()
						}
					}
					uni.stopPullDownRefresh();
					if(this.reqIds[curPage]&&this.reqIds[curPage].has(id)){
						this.reqIds[curPage].delete(id);
					}
					this.completeRequest&&this.completeRequest({res,resolve,reject,params,extra})
				}
			})
			if(!this.reqIds[curPage]) this.reqIds[curPage] = new Set();
			this.reqIds[curPage].add(id);
			// 返回id
			extra.getId&&extra.getId(id);
		})
	}
	abort(curPage,id){
	  let reqIds = this.reqIds
	  if(reqIds[curPage]&&reqIds[curPage].has(id)) reqIds[curPage].delete(id);
	  id.abort()
	}
	// 获取当前所有页面的路由地址
	getCurPageRoutes(){
		let routes = getCurrentPages();
		let arr = [];
		routes.forEach(item=>{
			arr.push(item.route);
		})
		return arr;
	}
	getCurPage(){
		let result = ''
		let routes = getCurrentPages().reverse()
		routes.length && (result = routes[0].route)
		return result
	}
	// 清除当前/某个页面所有请求
	clearCurPageReq(curPage=""){
		curPage = curPage||this.getCurPage();
		let reqIds = this.reqIds;
		reqIds[curPage]&&reqIds[curPage].forEach(item=>{
			this.abort(curPage,item);
		})
		delete reqIds[curPage];
		this.reqIds = reqIds;
	}
}

export default req;