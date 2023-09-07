import axios from '../httpServe.js'
const deleteNewsListApi = {
  // 删除新闻
  deleteNewsList(id) {
    return axios.delete('/news/deleteNews/' + id)
  }
}
export default deleteNewsListApi
