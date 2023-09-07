import axios from '../httpServe.js'
const deleteUserTableDataApi = {
  // 根据id删除用户
  deleteUserTable(id) {
    return axios.delete('/user/deleteUserById/' + id)
  }
}
export default deleteUserTableDataApi
