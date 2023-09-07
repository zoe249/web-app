import axios from '../httpServe.js'
const putUserTableDataApi = {
  // 根据id修改用户状态
  putUserStatus(id, params) {
    console.log('状态111111', id, params)
    return axios.put('/user/putUserStatusById/' + id, params)
  },
  // 根据id修改用户
  putUserBy(id, params) {
    console.log('编辑66666', id, params)
    // 路径参数+body参数
    return axios.put('/user/putUserById/' + id, params)
  }
}
export default putUserTableDataApi
