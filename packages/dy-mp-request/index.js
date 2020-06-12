const util = require('./util.js')
const noAlertList = [
  '/user/ownerMenu/getWeiXinRole', '/rgt/rgtOwner/findOwnerLoginInfo', 
  '/user/ownerMenu/queryOwnerMenus','/user/ownerMenu/queryAllMenuButtonV2'
]

function request(params = {}, extra = {}){
  let loading = false;
  let apiServer = getApp().globalData.apiServer;
  /**
   * params
   */
  let p = {
    header: {},data: {},url: '',method: 'POST',
    dataType: 'json',responseType: 'text',
  }
  params.url = apiServer + params.url;
  params = { ...p, ...params }
  let header = { "content-type": "application/json", ...params.header };
  let tk = wx.getStorageSync(getApp().globalData['TOKEN']);
  if (tk) {
    header['cookie'] = `CONSIGNOR-SESSION=${tk}`;
  }
  params.header = header
  /**
   * extra
   * errBack    后台跑错回调
   * failBack   网络异常回调
   */
  let e = { 
    showLoading: true, //默认带showLoading
    loadingText: '', //加载文本
    toastFail: true, //直接抛出接口返回的错误
    toastErr: false,//直接抛出网络异常
    errBack: '', //后台抛错回调
    failBack: ''  //网络异常回调
  }
  extra = { ...e,...extra }

  return new Promise((resolve, reject) => {

    // 请求完成处理
    function successFun(res) {
      let data = res.data || {};
      let statusCode = res.statusCode;
      if (statusCode == 401) {
        if (noAlertList.find((item=> params.url.endsWith(item)))!=undefined){
          getApp().goInitPage()
        }else{
          util.alertSuccess('登录失效重新登录', () => {
            getApp().goLoginPage()
          });
        }
      }else if(statusCode == 200){
        resolve(res)
      }else{
        let dataType = typeof data;
        if (dataType == 'string') { data = { message: data } };
        if (extra.toastErr) {
          util.alertSuccess(data.message,()=>{
            extra.errBack && extra.errBack()
          })
        } else {
          reject({ errType: 'err', err: data });
        }
      }
    }
    if (!loading && extra.showLoading){
      util.showLoading()
      loading = true
    }
    let requestId = wx.request({
      ...params,
      success: (res) => {
        successFun(res, requestId)
      },
      fail: () => {
        if (extra.toastFail) {
          util.alertSuccess(getApp().globalData.failMsg,() => { extra.failBack && extra.failBack(); })
        } else {
          reject({ errType: 'fail', err: { message: getApp().globalData.failMsg} });
        }
      },
      complete: () => {
        wx.stopPullDownRefresh()
        loading&&extra.showLoading && util.hideLoading();
        loading&&(loading = false)
      }
    })
  })
}

function abort(id){
  id.abort()
}

export default request;
export {
  abort
}