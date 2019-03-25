import config from '@/config'
import { getStorage, setStorage } from '@/utils/wx-utils'

const INVALID_TOKEN = '999999'
const TOKEN_KEY = '__wxt__'

// 请求拦截
const requestInterceptors = opts => {
  const apiPrefixs = config.wxServer
  opts.data = opts.data || {}
  opts.method = opts.method || 'POST'

  const headers = {}
  headers['accept'] = 'application/json'
  headers['content-type'] = 'application/json'
  headers['authentication'] = getStorage(TOKEN_KEY)

  opts.headers = Object.assign({}, headers, opts.headers)
  // 请求url拼接
  opts.url = apiPrefixs + opts.url
  return opts
}

// 响应拦截
const responseInterceptors = (res, opts) => {
  // token过期 有问题
  if (res.data.code === INVALID_TOKEN) {
    setStorage(TOKEN_KEY, '')
    setStorage('clearToken', '1')
  }
  return res.data
}

/**
 * ajax 统一方法
 * @param opts
 * ops: {
 *   url: string,
 *   method: string='post',
 *   data: object,
 *   headers: object
 * }
 * @returns {Promise<any>}
 */
const fetchApi = function (opts) {
  opts = requestInterceptors(opts)
  return new Promise((resolve, reject) => {
    wx.request({
      url: opts.url,
      method: opts.method,
      data: opts.data,
      header: opts.headers,
      success: function (res) {
        if (res.statusCode === 200) {
          const rs = responseInterceptors(res, opts)
          resolve(rs)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

export default fetchApi
