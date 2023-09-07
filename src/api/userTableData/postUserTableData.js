import axios from '../httpServe.js'
const postUserTableDataApi = {
  // 新增用户
  postUserTable(params) {
    return axios.post('/user/addUser', params)
  }
}
export default postUserTableDataApi
