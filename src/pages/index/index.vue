<template>
  <div class="page-home">
    <div class="userinfo">
      <div class="userinfo_avatar">
        <image :src="wxUserInfo.avatarUrl" />
      </div>
      <div class="userinfo_name">
        {{wxUserInfo.nickName}}
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import store from '@/store'
import { checkLogin, checkAuth } from '@/utils'
import { showToast, getStorage, wxDelay } from '@/utils/wx-utils'

export default {
  data () {
    return {}
  },

  computed: {
    wxUserInfo () {
      return store.state.wxUserInfo
    }
  },

  methods: {
    async getWxUserInfo () {
      const { userInfo } = await wx.getUserInfoPro()
      store.commit('setWxUserInfo', userInfo)
    },
    async getUserInfo () {
      const token = getStorage('__wxt__')
      const userInfoRes = await api.common.getUserInfo({ token })
      const code = userInfoRes.code
      const userInfo = userInfoRes.data
      if (code === '000000') {
        store.commit('setUserInfo', userInfo)
        // if (!userInfo.mobile) {
        //   showToast('请先绑定手机号')
        //   wxDelay('redirectTo', 1500, {
        //     url: '/pages/bind-phone/main'
        //   })
        // }
      } else {
        showToast(userInfoRes.message || '用户信息请求异常')
      }
    }
  },

  async mounted () {
    const hasAuth = await checkAuth()
    if (!hasAuth) {
      showToast('您还未授权')
      wxDelay('redirectTo', 1500, {
        url: '/pages/login/main'
      })
      return
    }
    await this.getWxUserInfo()
    // 登陆检测
    if (checkLogin()) {
      this.getUserInfo()
    } else {
      showToast('您还未登录，请先登录')
      wxDelay('redirectTo', 1500, {
        url: '/pages/login/main'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-home {
  position: relative;
  height: 100vh;
  background: url("https://kano.guahao.cn/d6969281824") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.wx-button {
  display: inline-block;
  width: 500rpx;
  height: 128rpx;
  line-height: 128rpx;
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
