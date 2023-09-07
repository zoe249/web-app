import axios from '../httpServe.js'
const getNewstypeApi = {
  // 新闻分类列表
  getNewstypeData(params) {
    return axios.get(
      `/newstype/getNewstypeList?code=${params.code}&name=${params.name}&status=${params.status}&pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`
    )
  },
  // 新闻列表
  getNewsData(params) {
    return axios.get(
      `/news/getNewsList?title=${params.title}&newstypecode=${params.newstypecode}&status=${params.status}&pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`
    )
  },
  // 根据id获取新闻列表详情
  getNewsId(id) {
    return axios.get('/news/getNewsById/' + id)
  }
}
export default getNewstypeApi
