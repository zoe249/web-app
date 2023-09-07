import axios from '../httpServe.js'
const getBannertypeTableDataApi = {
  // 获取轮播分类列表
  getBannertypeTableData(params) {
    // query参数
    return axios.get(
      `/bannertype/getBannertypeList?code=${params.code}&name=${params.name}&status=${params.status}&pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`
    )
  },
  // 轮播列表
  getBannerData(params) {
    return axios.get(
      `/banner/getBannerList?name=${params.name}&bannertypecode=${params.bannertypecode}&status=${params.status}&islarge=${params.islarge}&pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`
    )
  },
  // 根据id查看轮播图
  getBannerById(id) {
    return axios.get('/banner/getBannerById/' + id)
  }
}
export default getBannertypeTableDataApi
