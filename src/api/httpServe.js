// 导入axios
import axios from 'axios'
import { Message, Notification } from 'element-ui' // 引入element ui
import Vue from 'vue'
// 引入进度条
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css' // 引入进度条css样式
// import { config } from './config'
/**
 * 提示函数
 * 显示一秒后关闭
 */
const tip = (msg) => {
  Message({
    message: msg,
    duration: 1000,
    type: 'error'
  })
}
/**
 * 环境变换
 *
 */
switch (process.env.NODE_ENV) {
  // 生产环境
  case 'production':
    // 根据需要的路径
    // http://ltofficial.yuepong.cn/
    axios.defaults.baseURL = 'http://ltofficial.yuepong.cn/api/v1.0' // 线上
    // axios.defaults.baseURL = 'http://192.168.0.202:3001/api/v1.0'
    // axios.defaults.baseURL = 'http://192.168.0.135:3000/api/v1.0' // 本地
    break
  // 测试环境
  default:
    axios.defaults.baseURL = 'http://ltofficial.yuepong.cn/api/v1.0' // 线上
  // axios.defaults.baseURL = 'http://192.168.0.202:3001/api/v1.0'
  // axios.defaults.baseURL = 'http://192.168.0.135:3000/api/v1.0' // 本地
}
// 获取验证码地址

// 设置七牛云的上传域名
Vue.prototype.$domain = 'https://upload-z1.qiniup.com'
// Vue.prototype.$notify = Notification
/*
 * 设置超时时间和跨域，是否允许携带凭证
 */
axios.defaults.timeout = 50000
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 *
 */
axios.interceptors.request.use(
  (config) => {
    // 进度条出现
    Nprogress.start()
    const token = window.sessionStorage.getItem('token')
    // 每次发起请求在请求头上加上token值
    token && (config.headers.token = token) // !!!添加token !!!
    console.log('token', token, config.headers.token)
    // 数据返回的还是config
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/*
 * 响应拦截器
 * 服务器返回信息 -> [拦截器的统一处理] ->客户端js获取到信息
 */
axios.defaults.validateStatus = (status) => {
  // 自定义响应成功的HTTP状态码
  return /^(2|3)\d{2}$/.test(status)
}
// 响应拦截器
axios.interceptors.response.use(
  // 请求成功
  (response) => {
    // 进度条消失
    Nprogress.done()
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则会抛出错误
    return response.data
  },
  // 请求失败
  (error) => {
    // 进度条消失
    Nprogress.done()
    const { response } = error
    if (response) {
      switch (response.status) {
        case 400:
          // 400 参数有问题
          // tip('数据参数有问题')
          console.log('错误返回0000', response.data.errors) // 错误返回
          tip(response.data.errors)
          Nprogress.done()
          break
        case 401:
          // 401 未登录状态，跳转登录页
          Nprogress.done()
          break
        case 403:
          // 403 token过期
          // 清除token并跳转登录页
          tip('403,登录过期,请重新登录')
          localStorage.removeItem('token')
          Nprogress.done()
          break
        case 404:
          // 404 请求不存在
          tip('404,请求资源不存在')
          Nprogress.done()
          break
        case 500:
          Notification.error({
            title: '业务提示',
            // message: response.data.detail + ',请点击刷新重试',
            message: response.data.errors + ',请点击刷新重试',
            duration: 2000
          })
          return response
        // 服务器异常（一般是业务报的错）
      }
    } else {
      // 服务器连结果都没有返回
      if (!window.navigator.onLine) {
        // 断网处理：可以跳转到断网页面
        return
      }
      return Promise.reject(error)
    }
  }
)
// 导出封装的axios
export default axios
