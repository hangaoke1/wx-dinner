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

/**
 * 函数柯里化
 * @param {*} fn 函数
 * @param {*} bindArgs 预设参数
 */
export const curry = function (fn, bindArgs = []) {
  return function curryCb () {
    const args = bindArgs.concat([].slice.call(arguments))
    return fn.length === args.length
      ? fn.apply(null, args)
      : curry(fn, args)
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
export const wxDelay = curry(function (method, delay, params) {
  const wxFn = wx[method]
  if (!isFn(wxFn)) {
    console.warn(`WARN: wx对象上不存在方法${method}`)
    return
  }
  const args = [].slice.call(arguments, 2)
  if (delay) {
    setTimeout(() => {
      wxFn.apply(null, args)
    }, delay)
  } else {
    wxFn.apply(null, args)
  }
})
