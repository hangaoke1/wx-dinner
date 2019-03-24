import { getStorage } from './wx-utils'

// 检测是否登陆
export const checkLogin = () => {
  const __wxt__ = getStorage('__wxt__')
  return !!__wxt__
}

// 将微信回调式的api改为promise
export const wxPromisefy = wxFn => {
  return opts => {
    return new Promise((resolve, reject) => {
      wxFn(Object.assign(opts || {}, {
        success: resolve,
        fail: err => {
          console.log(err)
          reject(err)
        }
      }))
    })
  }
}

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime
}
