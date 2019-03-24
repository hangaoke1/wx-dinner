import Vue from 'vue'
import App from './App'
import store from './store'
import { wxPromisefy } from './utils'

Vue.config.productionTip = false
App.mpType = 'app'

const gvm = new Vue(App)
gvm.$mount()

wx.$store = store
// wxPromisefy
wx.chooseImagePro = wxPromisefy(wx.chooseImage)
wx.uploadFilePro = wxPromisefy(wx.uploadFile)
wx.loginPro = wxPromisefy(wx.login)
wx.showModalPro = wxPromisefy(wx.showModal)
wx.getSettingPro = wxPromisefy(wx.getSetting)
wx.requestPaymentPro = wxPromisefy(wx.requestPayment)
wx.getSystemInfoPro = wxPromisefy(wx.getSystemInfo)
wx.getImageInfoPro = wxPromisefy(wx.getImageInfo)
wx.saveImageToPhotosAlbumPro = wxPromisefy(wx.saveImageToPhotosAlbum)
wx.getUserInfoPro = wxPromisefy(wx.getUserInfo)
