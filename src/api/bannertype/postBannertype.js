import axios from '../httpServe.js'
const postBannertypeTableApi = {
  // 获取轮播分类列表
  postBannertype(params) {
    return axios.post('/bannertype/addBannertype', params)
  },
  // 添加轮播图
  postBanner(params) {
    return axios.post('/banner/addBanner', params)
  }
}
export default postBannertypeTableApi
