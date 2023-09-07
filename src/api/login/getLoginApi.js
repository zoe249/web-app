import axios from '../httpServe.js'
const getLoginApi = {
  // 获取当前用户接口
  getLoginUserInfo() {
    return axios.get('/auth/currentUser')
  }
}
export default getLoginApi
