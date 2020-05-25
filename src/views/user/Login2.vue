<template>
  <div class="main">
    <div class="cover-bg">
      <div class="login-box">
        <div class="title">
          <div><img src="@/assets/logo.svg"/></div>
          <div class="txt-title">江苏河长制</div>
        </div>
        <a-form
          ref="formLogin"
          layout="horizontal"
          :form="form"
          @submit="handleSubmit">
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账户"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item style="margin-top: -15px">
            <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
            <router-link
              :to="{ name: 'login', params: { user: 'aaa'} }"
              class="forge-password"
              style="float: right;"
            >忘记密码</router-link>
          </a-form-item>
          <a-form-item style="margin-top:20px;margin-bottom: 0">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { timeFix } from '@/utils/util'

  export default {
    name: 'Login2',
    data () {
      return {
        isLoginError: false,
        form: this.$form.createForm(this),
        state: {
          time: 60,
          loginBtn: false,
          // login type: 0 email, 1 username, 2 telephone
          loginType: 0
        }
      }
    },
    methods: {
      ...mapActions(['Login', 'Logout']),
      handleSubmit (e) {
        e.preventDefault()
        const validateFieldsKey = ['username', 'password']
        const {
          form: { validateFields },
          state,
          Login
        } = this

        validateFields(validateFieldsKey, { force: true }, (err, values) => {
          if (!err) {
            const loginParams = { ...values }
            loginParams.username = values.username
            // loginParams.password = md5(values.password)
            loginParams.password = values.password
            Login(loginParams)
              .then((res) => this.loginSuccess(res))
              .catch(err => this.requestFailed(err))
              .finally(() => {
                state.loginBtn = false
              })
          } else {
            setTimeout(() => {
              state.loginBtn = false
            }, 600)
          }
        })
      },
      handleUsernameOrEmail (rule, value, callback) {
        const { state } = this
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        if (regex.test(value)) {
          state.loginType = 0
        } else {
          state.loginType = 1
        }
        callback()
      },
      loginSuccess (res) {
        this.$router.push({ path: '/' })
        // 延迟 1 秒显示欢迎信息
        setTimeout(() => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        }, 1000)
        this.isLoginError = false
      },
      requestFailed () {
        this.isLoginError = true
        // this.$router.push({ name: 'MapIndex' })
        // this.$notification['error']({
        //   message: '错误',
        //   description: (err.data || {}).msg || '请求出现错误，请稍后再试',
        //   duration: 4
        // })
      }
    }
  }
</script>

<style scoped>
  .txt-title {
    font-size: 24px;
    color: rgba(0, 0, 0, .85);
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
  }
  .main {
    text-align: center;
    background: linear-gradient(180deg, #0D7DD9 0%, #135DE8 100%) ;
    /*background:url(~@/assets/bg2.svg) no-repeat 50%;*/
    /*background-size: 100%;*/
    height: 100vh;
    position: relative;
  }
  .cover-bg {
    height: 100vh;
    background:url(~@/assets/bg2.svg) no-repeat 50%;
    background-size: 100%;
  }
  .login-box {
    text-align: left;
    background-color: #fff;
    width: 320px;
    padding: 32px 32px;
    position: absolute;
    top: 50%;
    right: 20%;
    border-radius: 8px;
    transform: translateY(-50%);
  }
  .title {
    margin-bottom: 20px;
    margin-top: -10px;
  }
  .title div {
    text-align: center;
  }
  .title img{
    width: 48px;
    margin-bottom: 14px;
  }
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
</style>
