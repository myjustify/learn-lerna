const util = {
    isEmpty(value) {
		if (value == undefined || value == 'undefined' || value == null)
			return true;
		value = (value + '').replace(/(^\s+)|(\s+$)/g, "");
		if (value == '')
			return true;
		return false;
	},
    /**
	 * [功能方法]
	 * @param  {[type]}  item [description]
	 * @return {Boolean}      [description]
	 */
	// 弱提示
	toast(p={}) {
		let params = {
			title: '未知错误',
			icon:'none',
			mask: true,
			duration:2000,
            ...p,
			success: function() {
				p.success && setTimeout(() => {
					p.success()
				}, duration)
			}
		}
		wx.showToast(params)
	},
	// 提示
	alert(params={}) {
		let p = {
			title: '系统提示',
			content:'未知错误',
			showCancel: false,
            ...params
		}
		wx.showModal({
			...p
		})
	},
    // 显示loading
	showLoading(msg) {
		if (this.isEmpty(msg)) {msg = '加载中'}
		wx.showLoading({title: msg,mask: true});
	},
	// 隐藏loading
	hideLoading() {
		wx.hideLoading();
	}
}

module.exports = util;