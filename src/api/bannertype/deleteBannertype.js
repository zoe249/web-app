import axios from '../httpServe.js'
const deleteBannertypeTableApi = {
  // 删除轮播图
  deleteBanner(id) {
    return axios.delete('/banner/deleteBanner/' + id)
  }
}
export default deleteBannertypeTableApi
