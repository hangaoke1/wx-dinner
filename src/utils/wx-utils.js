// 获取本地缓存信息, (同步)
export const getStorage = key => {
  return wx.getStorageSync(key) || ''
}

// 设置本地缓存, (异步)
export const setStorage = (key, data = '') => {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: key,
      data: data,
      success: resolve,
      fail: reject
    })
  })
}

// 简单的显示toast
export const showToast = str => {
  if (str) {
    wx.showToast({
      title: str,
      icon: 'none',
      mask: true
    })
  }
}

// 显示loading
export const showLoading = title => {
  if (title) {
    wx.showLoading({
      title,
      mask: true
    })
  }
}

export const hideLoading = delay => {
  if (delay) {
    setTimeout(() => {
      wx.hideLoading()
    }, delay)
  } else {
    wx.hideLoading()
  }
}

const isFn = function (v) {
  return typeof v === 'function'
}

/**
 * 延迟执行微信相关方法
 * @param {*} method 方法名
 * @param {*} delay 延迟时间
 * wxDelay('redirectTo', 1500, {
 *  url: '/pages/login/main'
 * })
 * or
 * wxDelay('redirectTo', 1500)({
 *  url: '/pages/login/main'
 * })
 */
export const wxDelay = function (method, delay) {
  const wxFn = wx[method]
  if (!isFn(wxFn)) {
    console.warn(`WARN: wx对象上不存在方法${method}`)
    return
  }
  if (arguments.length > 2) {
    const args = Array.prototype.slice.call(arguments, 2)
    if (delay) {
      setTimeout(() => {
        wxFn(...args)
      }, delay)
    } else {
      wxFn(...args)
    }
    return
  }
  return function delayFn () {
    const args = arguments
    if (delay) {
      setTimeout(() => {
        wxFn(...args)
      }, delay)
    } else {
      wxFn(...args)
    }
  }
}
