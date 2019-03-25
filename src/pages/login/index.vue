<template>
  <div class="page-login">
    <div class="userinfo">
      <div class="userinfo_avatar">
        <image :src="wxUserInfo.avatarUrl" />
      </div>
      <div class="userinfo_name">
        {{wxUserInfo.nickName}}
      </div>
    </div>
    <button class="login_btn" type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo">一键登录</button>
  </div>
</template>

<script>
import api from '@/api'
import store from '@/store'
import { showLoading, hideLoading, showToast, getStorage, wxDelay } from '@/utils/wx-utils'

export default {
  name: 'page-login',
  data () {
    return {}
  },
  computed: {
    wxUserInfo () {
      return store.state.wxUserInfo
    }
  },
  methods: {
    async getuserinfo (userInfo) {
      showLoading('登陆中')
      // 判断用户是否授权
      const authRes = await wx.getSettingPro()
      if (authRes.authSetting['scope.userInfo']) {
        const { code } = await wx.loginPro()
        await this.login(code)
      } else {
        hideLoading()
        showToast('请先授权')
      }
    },
    async syncUserInfo () {
      const token = getStorage('__wxt__')
      const { userInfo } = await wx.getUserInfoPro()
      store.commit('setWxUserInfo', userInfo)
      const data = {
        token,
        userInfo: Object.assign({ mobile: '' }, userInfo)
      }
      await api.common.saveUserInfo(data)
      console.log('success: 同步微信用户信息成功')
    },
    async login (code) {
      const res = await api.common.login({ code })
      const data = res.data
      wx.setStorageSync('__wxt__', data.token)
      // 同步用户信息
      await this.syncUserInfo()
      hideLoading()
      // 判断手机号绑定
      if (!data.mobile) {
        showToast('请先绑定手机号')
        wxDelay('redirectTo', 1500, {
          url: '/pages/bind-phone/main'
        })
      }
    }
  }
}
</script>

<style lang="less">
.page-login {
  position: relative;
  height: 100vh;
  background: url("https://kano.guahao.cn/d6969281824") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.login_btn {
  width: 400rpx;
  margin-top: 50px;
  font-size: 16px;
}

.userinfo_avatar {
  width: 200rpx;
  height: 200rpx;
  margin: 140rpx auto 0 auto;
  border-radius: 200rpx;
  overflow: hidden;
  image {
    width: 100%;
    height: 100%;
  }
}

.userinfo_name {
  text-align: center;
  color: #fff;
  margin: 30rpx 0;
}
</style>
