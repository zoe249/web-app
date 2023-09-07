import axios from '../httpServe.js'
const putNewsApi = {
  // 根据id修改新闻详情
  putNewsEditById(id, params) {
    console.log('编辑确定接口', id, params)
    return axios.put('/news/putNewsById/' + id, params)
  }
}
export default putNewsApi
