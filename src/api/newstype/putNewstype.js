import axios from '../httpServe.js'
const putNewstypeApi = {
  // 修改新闻分类状态
  putNewstype(id, params) {
    return axios.put('/newstype/updateNewstypeStatus/' + id, params)
  },
  // 根据id修改新闻详情
  putNewsEditById(id, params) {
    console.log('编辑确定接口', id, params)
    return axios.put('/news/putNewsById/' + id, params)
  },
  // 修改新闻状态
  putNewsStatus(id, params) {
    return axios.put('/news/putNewsStatus/' + id, params)
  }
}
export default putNewstypeApi
