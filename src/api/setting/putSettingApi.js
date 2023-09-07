import axios from '../httpServe.js'
const putSettingApi = {
  // 获取系统设置列表
  putSetting(id, params) {
    return axios.put('/setting/putSetting/' + id, params)
  }
}
export default putSettingApi
