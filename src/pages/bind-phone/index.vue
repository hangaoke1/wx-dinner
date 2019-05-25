<template>
  <div class="page-bind-phone">
    <div class="userinfo">
      <div class="userinfo_avatar">
        <image :src="wxUserInfo.avatarUrl" />
      </div>
      <div class="userinfo_name">
        {{wxUserInfo.nickName}}
      </div>
    </div>
    <div class="page-bind-phone_form">
      <div class="page-bind-phone_input">
        <input v-model.lazy="phone" type="number" placeholder="输入您的手机号" />
      </div>
      <div class="page-bind-phone_input">
        <input v-model.lazy="vfcode" placeholder="请输入验证码" />
      </div>
    </div>
    <button class="page-bind-phone_action" @click="goHome">提交验证</button>
  </div>
</template>

<script>
import { showToast } from '@/utils/wx-utils.js'
import store from '@/store'
export default {
  name: 'page-bind-phone',
  data () {
    return {
      vfcode: '',
      phone: ''
    }
  },
  computed: {
    wxUserInfo () {
      return store.state.wxUserInfo
    }
  },
  methods: {
    goHome () {
      // 假验证码
      if (+this.vfcode === 123456) {
        showToast('绑定成功')
        wx.switchTab({
          url: '/pages/index/main'
        })
      } else {
        showToast('您输入的验证码错误！')
      }
    }
  }
}
</script>

<style lang="less">
.page-bind-phone {
  position: relative;
  height: 100vh;
  background: url("https://kano.guahao.cn/d6969281824") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
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

.page-bind-phone_form {
  width: 600rpx;
  margin: 0 auto;
}
.page-bind-phone_input {
  font-size: 14px;
  padding: 20rpx;
  margin-bottom: 20rpx;
  background: #fff;
}
.page-bind-phone_action {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 150rpx;
  width: 600rpx;
  height: 100rpx;
  font-size: 16px;
  line-height: 100rpx;
  color: #fff;
  background-color: rgba(64, 158, 255, 0.6);
  border-radius: 0;
  border: none;
}
.page-bind-phone_action::after {
  border: none;
}
</style>
