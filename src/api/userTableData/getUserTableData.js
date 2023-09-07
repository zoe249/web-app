import axios from '../httpServe.js'
const getUserTableDataApi = {
  // 获取用户列表
  getUserTableList(params) {
    // query参数
    return axios.get(
      `/user/getUserList?username=${params.username}&nickname=${params.nickname}&status=${params.status}&pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`
    )
  },
  // 根据id查询用户信息
  getEditUserTable(id) {
    return axios.get('/user/getUserById/' + id)
  },
  // 查询用户名是否存在
  isExistUsername(value) {
    console.log('params', value)
    return axios.get('/user/isExistUsername/' + value)
  }
}
export default getUserTableDataApi
