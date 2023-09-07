import axios from '../httpServe.js'
const getQiniuTokenApi = {
  // 获取七牛云token
  getQiniuToken() {
    return axios.get('file/getQiniuToken')
  }
}
export default getQiniuTokenApi
