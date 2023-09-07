import axios from '../httpServe.js'
const postLoginApi = {
  // 获取登录接口
  postLogin(loginForm) {
    // 传参，body参数
    return axios.post('/auth/login', loginForm)
  }
}
export default postLoginApi
