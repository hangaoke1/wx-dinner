import wxAPI from '@/api/wx-api'

/**
 * 登陆接口
 * http://rap2.taobao.org/repository/editor?id=162501&itf=883074
 * @param {*} data
 */
export const login = function (data) {
  return wxAPI({
    url: '/login',
    method: 'post',
    data
  }).then(response => {
    return response
  })
}

/**
 * 获取用户信息
 * http://rap2.taobao.org/repository/editor?id=162501&itf=888219
 * @param {*} data
 */
export const getUserInfo = function (data) {
  return wxAPI({
    url: '/getUserInfo',
    method: 'post',
    data
  }).then(response => {
    return response
  })
}

/**
 * 更新用户信息
 * http://rap2.taobao.org/repository/editor?id=162501&itf=888170
 * @param {*} data
 */
export const saveUserInfo = function (data) {
  return wxAPI({
    url: '/saveUserInfo',
    method: 'post',
    data
  }).then(response => {
    return response
  })
}
