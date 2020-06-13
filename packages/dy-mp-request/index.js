const util = require('dy-mp-util');
// data存储apiServer的对象 
function mpRequest({ data:gdata,apiServer }){
    this.failMsg = '网络异常，稍后重试';
    this.loading = false; 
    this.gdata = gdata;
    this.apiServerField = apiServer
}
mpRequest.prototype.errField = 'message';   //后台抛错信息的字段默认message  
mpRequest.prototype.request = function(params,extra){
  /**
   * params
   */
  let p = {
    header: {},data: {},url: '',method: 'POST',
    dataType: 'json',responseType: 'text',
  }
  params.url = this.gdata[this.apiServerField] + params.url;
  params = { ...p, ...params }
  let header = { "content-type": "application/json", ...params.header };
  /**
   * extra
   * errBack    后台跑错回调
   * failBack   网络异常回调
   */
  let e = { 
    showLoading: true, //默认带showLoading
    loadingText: '', //加载文本
    takeTk: true,   //是否带上tk
    toastFail: true, //直接抛出接口返回的错误
    toastErr: false,//直接抛出网络异常
    errBack: '', //后台抛错回调
    failBack: ''  //网络异常回调
  }
  extra = { ...e,...extra }
  
  //扩展接口 getTk  项目引入后通过prototype扩展一个getTK的方法
  if(extra.takeTk&&this.getTk){
    let tk = this.getTk()
    if (tk) {
        header = { ...header,...tk };
    }
  }
  params.header = header

  return new Promise((resolve, reject) => {

    // 请求完成处理
    function successFun(res) {
      let data = res.data || {};
      let statusCode = res.statusCode;
      if(statusCode == 200){
        resolve(res)
      }else{
        let dataType = typeof data;
        if (dataType == 'string') {
            data = { message: data } 
        }else{
            data.message = data[this.errField]
        }
        if (extra.toastErr) {
          util.alert({
              content: data.message,
              success:()=>{
                extra.errBack && extra.errBack()
              }
          })
        } else {
          reject({ errType: 'err', err: data });
        }
      }
    }
    if (!this.loading && extra.showLoading){
      util.showLoading()
      this.loading = true
    }
    let requestId = wx.request({
      ...params,
      success: (res) => {
        successFun(res, requestId)
      },
      fail: () => {
        if (extra.toastFail) {
          util.alert({
              content: this.failMsg,
              success:()=>{
                extra.failBack && extra.failBack();
              }
          })
        } else {
          reject({ errType: 'fail', err: { message: this.failMsg} });
        }
      },
      complete: () => {
        wx.stopPullDownRefresh()
        this.loading&&extra.showLoading && util.hideLoading();
        this.loading&&(this.loading = false)
      }
    })
  })
}

mpRequest.prototype.abort = function(id){
    id.abort()
}
module.exports = mpRequest;