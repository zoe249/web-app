import axios from '../httpServe.js'
const getSettingApi = {
  // 获取系统设置列表
  getSettingList() {
    return axios.get('/setting/getSettingList')
  }
}
export default getSettingApi
