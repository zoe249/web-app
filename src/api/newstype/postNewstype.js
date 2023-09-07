import axios from '../httpServe.js'
const postNewstypeApi = {
  // 添加新闻分类
  postNewstype(params) {
    return axios.post('/newstype/addNewstype', params)
  },
  // 添加新闻
  postAddNews(params) {
    return axios.post('/news/addNews', params)
  },
  imgPost() {
    return axios.post('https://upload-z1.qiniup.com')
  }
}
export default postNewstypeApi
