<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown placement="bottomLeft" :getPopupContainer="popupContainer">
        <span class="action ant-dropdown-link user-dropdown-menu" style="line-height: 34px;display: inline-block;width: 50%;transform: translateX(calc(100% - 14px))">
          <a-avatar class="avatar" :size="28" :src="avatar" />
          <span>{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="1" disabled>
            <!--            <router-link :to="{ name: 'settings' }">-->
            <a-icon type="setting"/>
            <span>个人设置</span>
            <!--            </router-link>-->
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])

  },
  methods: {
    ...mapActions(['Logout']),
    popupContainer () {
     return document.getElementsByClassName('ant-layout-sider')[0]
    },
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({}).then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 16)
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
