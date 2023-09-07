<template>
  <div>
    <!-- 登录界面容器 -->
    <div class="container">
      <!-- 背景 -->
      <div class="login_box">
        <!-- 左侧空间 -->
        <div class="loginBoxLeftForm"></div>
        <!-- 右侧登录表单 -->
        <div class="loginBoxForm">
          <div class="loginBoxFormClass">
            <!-- 登录图片 -->
            <div class="loginBoxTop">
              <img src="../assets/login/dl.png" class="loginBoxTopImg" alt="" />
              <span class="loginBoxTopSpan">欢迎使用龙腾软件</span>
            </div>
            <!-- 表单区域 -->
            <div class="loginBoxMiddle">
              <el-form
                :model="loginForm"
                :rules="loginFormRules"
                ref="loginFormRef"
              >
                <!-- 用户名 -->
                <el-form-item prop="username">
                  <el-input
                    v-model.trim="loginForm.username"
                    placeholder="请输入账号"
                    class="usernameInput"
                  >
                    <img
                      src="../assets/login/icon2.png"
                      class="userIconClass"
                      slot="prefix"
                      alt=""
                    />
                  </el-input>
                </el-form-item>
                <!-- 密码框 -->
                <el-form-item prop="password">
                  <el-input
                    v-model.trim="loginForm.password"
                    type="password"
                    placeholder="请输入密码"
                    class="passwordInput"
                    @keyup.enter.native="loginBtn"
                  >
                    <img
                      src="../assets/login/icon.png"
                      class="userIconClass"
                      slot="prefix"
                      alt=""
                    />
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-checkbox class="keepPasswordClass" v-model="keepPassword"
                    >记住密码
                  </el-checkbox>
                </el-form-item>
                <el-form-item>
                  <img
                    @click="loginBtn"
                    src="../assets/login/button.png"
                    class="loginBoxMiddleBtn"
                    alt=""
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 公司信息 -->
    <div class="loginBottom">
      <span
        >Copyright © 2016-2020 深圳市优讯龙腾科技有限公司 All rights
        reserved</span
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 登录参数
      loginForm: {
        username: '',
        password: ''
      },
      // 登录校验
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      // 记住密码
      keepPassword: false
    }
  },
  mounted() {
    this.getCookie() // 读取cookie
  },
  methods: {
    /**
     * 登录方法
     *
     */
    loginBtn() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          // 获取登录接口
          this.$api.postLoginApi.postLogin(this.loginForm).then((res) => {
            console.log('登录', res)
            sessionStorage.setItem('token', res.data.token)
            if (res.errno === '200000') {
              this.$router.push('/home') // 跳转页面
              this.$message.success('登录成功')
            }
          })
        }
      })
      // 判断记住密码
      if (this.keepPassword) {
        this.setCookie(this.loginForm.username, this.loginForm.password, 7)
      } else {
        this.clearCookie() // 清除数据
      }
    },
    /**
     * 记住密码
     *
     */
    // 设置cookie
    setCookie(username, password, exdays) {
      var exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
        'userName' + '=' + username + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie =
        'userPwd' + '=' + password + ';path=/;expires=' + exdate.toGMTString()
    },
    getCookie() {
      if (document.cookie.length > 0) {
        this.keepPassword = true
        var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'userName') {
            this.loginForm.username = arr2[1] // 保存到保存数据的地方
          } else if (arr2[0] === 'userPwd') {
            this.loginForm.password = arr2[1]
          }
        }
      }
    },
    // 清除cookie
    clearCookie: function () {
      this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
    }
  }
}
</script>
<style lang="less" scoped>
// 界面区域
.container {
  background: url('../assets/login/background.png') no-repeat;
  margin-left: -2px;
  height: var(--height118, 100vh);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
// 背景图片
.login_box {
  display: flex;
  width: var(--width, 1139px);
  height: var(--height, 712px);
  // width: var(--width, 1304px);
  // height: var(--height, 877px);
  background: url('../assets/login/group.png') no-repeat;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
// 左侧区域
.loginBoxLeftForm {
  flex: 1;
}
// 右侧登录表单
.loginBoxForm {
  flex: 1;
}
.loginBoxFormClass {
  padding-top: var(--paddingTop, 100px);
  padding-left: var(--paddingLeft, 50px);
}
// 登录图片
.loginBoxTop {
  margin-left: 10px;
  // 登录图片
  .loginBoxTopImg {
    width: var(--width);
  }
  // 标题
  .loginBoxTopSpan {
    // width: 218px;
    height: 27px;
    font-size: var(--font-size, 26px);
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    margin-left: 19px;
    position: relative;
    top: -6px;
  }
}
// 表单区域
.loginBoxMiddle {
  margin-top: 40px;
}
// 输入框
/deep/.el-input__inner {
  width: 80%;
  height: var(--height, 70px);
  border-radius: 30px;
  border: 2px solid #ccc;
  font-size: 26px;
}
// 登录按钮
.loginBoxMiddleBtn {
  width: var(--width, 434.1px);
  position: absolute;
  top: var(--top, 55px);
  cursor: pointer;
}
// 记住密码
.keepPasswordClass {
  margin-left: 15px;
  margin-top: 19px;
}
/deep/.el-checkbox__inner {
  width: 27px;
  height: 27px;
  display: inline-block;
  position: relative;
  border: 2px solid #dcdfe6;
  border-radius: 2px;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 1;
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}
/deep/.el-checkbox__inner::after {
  box-sizing: content-box;
  content: '';
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 7px;
  left: 4px;
  position: absolute;
  top: 1px;
  transform: rotate(45deg) scaleY(0);
  width: 9px;
  transition: transform 0.15s ease-in 0.05s;
  transform-origin: center;
}
/deep/.el-checkbox__label {
  font-family: Microsoft YaHei;
  display: inline-block;
  padding-left: 10px;
  line-height: 19px;
  font-size: 20px;
  color: #666666;
}
// 公司信息
.loginBottom {
  width: 100%;
  font-family: Microsoft YaHei;
  position: absolute;
  height: 40px;
  bottom: var(--bottom, 17px);
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  color: #fff;
}
// 图标样式
/deep/.el-input__icon {
  font-size: 25px;
  height: 100%;
  text-align: center;
  transition: all 0.3s;
  line-height: 40px;
}
// 图标位置
.userIconClass {
  padding-top: 20px;
  padding-left: 30px;
}
// 输入框文字
/deep/.el-input--prefix .el-input__inner {
  padding-left: 80px;
}
// 输入框大小
.passwordInput {
  margin-top: 30px;
}
@media screen and (max-height: 801px) {
  .container {
    --height118: 100vh;
  }
  .login_box {
    // --width: 954px;
    // --height: 537px;
    width: 65%;
    height: 85%;
  }
  .loginBoxFormClass {
    --paddingTop: 48px;
    --paddingLeft: 26px;
  }
  .loginBoxTopImg {
    --width: 15%;
  }
  .loginBoxTopSpan {
    --font-size: 24px;
  }
  /deep/.el-input__inner {
    --width: 350px;
    --height: 65px;
  }
  .loginBoxMiddleBtn {
    --width: 90%;
    --top: 0px;
  }
  .loginBottom {
    --bottom: 6px;
  }
}
</style>
