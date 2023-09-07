import axios from '../httpServe.js'
const putBannertypeTableApi = {
  // 修改轮播分类状态
  putBannertype(id, params) {
    return axios.put('/bannertype/updateBannertypeStatus/' + id, params)
  },
  // 修改轮播图状态
  putBannerStatus(id, params) {
    return axios.put('/banner/putBannerStatus/' + id, params)
  },
  // 根据id修改轮播图
  putBannerById(id, params) {
    return axios.put('/banner/putBannerById/' + id, params)
  }
}
export default putBannertypeTableApi
