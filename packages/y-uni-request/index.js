// 延迟的请求需带上当前页面路由
// this.$api.index({})
// setTimeout(()=>{
// 	this.$api.index({},{ curPage,stopType:1 })
// },2000)
class req {
	constructor() {
		// reqIds "页面路径": new Set()  Set存页所有请求(请求中)
		this.reqIds = {};
		// reqWait{ curPage:'',fn: fn}
		this.reqWait =[];
		// 各个页面需要loading的请求数量 "页面路径": 0
		this.loadings = {};
		// 400毫秒后如果请求没结束 loding提示
		this.startLoadingTime = 400;
		
		// 请求最多10条 否则放入等待数组
		while(this.reqWait.length&&this.getLen()<10){
			let item = this.reqWait[this.reqWait.length-1]
			let curPage = item.curPage
			if(this.getCurPage()==curPage){
				item.fn()
			}
			this.reqWait.pop()
		}
	}
	/*
	* @extra stopType 请求是否能被终止 0正常模式可被终止 1不可被终止
	* 
	*/
	request(params={},extra={}){
		params = { data:{},method:'POST',dataType:'json',responseType:'text',...params }
		extra = { stopType:0,takeTk:true,baseParams:true,complatePath: false,showLoading: true,loadingText:'',toastFail: true,toastErr: false,...extra }
		params.header = { "content-type": "application/json",...params.header };
		let curPage = extra.curPage||this.getCurPage()
		if(!this.getCurPageRoutes().includes(curPage)&&extra.stopType!=1){
			console.log(curPage+"页面已被卸载,请求未发出",params,extra)
			return;
		}
		if(this.getLen()>=10){
			// console.log(this.getLen())
			this.reqWait.push({
				curPage,
				fn: this.request(params,extra)
			})
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
			let id = uni.request({
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
	//获取队列中请求的数量
	getLen(){
		let reqIds = this.reqIds
		let len = 0;
		let arr = Object.keys(reqIds);
		for(let i=0;i<arr.length;i++){
			let item = reqIds[arr[i]];
		}
		return len;
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
		return getCurrentPages().reverse()[0].route
	}
	// 清除当前/某个页面所有请求
	clearCurPageReq(curPage=""){
		curPage = curPage||this.getCurPage();
		let reqIds = this.reqIds;
		let reqWait = this.reqWait;
		reqWait.map(item=>{
			return item.curPage!=curPage;
		})
		reqIds[curPage]&&reqIds[curPage].forEach(item=>{
			this.abort(curPage,item);
		})
		delete reqIds[curPage];
		this.reqWait = reqWait;
		this.reqIds = reqIds;
	}
}

export default req;