// import myserver from '../request/getRequest.js'
import postLoginApi from './login/postLoginApi.js' // 登录接口
import getUserTableDataApi from './userTableData/getUserTableData.js' // 用户列表
import postUserTableDataApi from './userTableData/postUserTableData.js' // 新增用户
import deleteUserTableDataApi from './userTableData/deleteUserTableData.js' // 删除
import putUserTableDataApi from './userTableData/putUserTableData.js' // 编辑
import getBannertypeTableDataApi from './bannertype/getBannertype.js' // 轮播列表
import postBannertypeTableApi from './bannertype/postBannertype.js' // 添加轮播
import putBannertypeTableApi from './bannertype/putBannertype.js' // 轮播状态
import deleteBannertypeTableApi from './bannertype/deleteBannertype.js' // 删除轮播
import getQiniuTokenApi from './qiniuToken/getQiniuToken.js' // 获取七牛云token
import getNewstypeApi from './newstype/getNewstype.js' // 新闻分类
import postNewstypeApi from './newstype/postNewstype.js' // 添加新闻分类
import putNewstypeApi from './newstype/putNewstype.js' // 修改新闻分类
import deleteNewsListApi from './newstype/deleteNewstype.js' // 删除新闻
import putNewsApi from './newstype/putNews.js' // 修改新闻详情
import getSettingApi from './setting/getSettingApi.js' // 设置列表
import putSettingApi from './setting/putSettingApi.js' // 设置状态
import getLoginApi from './login/getLoginApi.js'
export default {
  postLoginApi,
  getUserTableDataApi,
  postUserTableDataApi,
  deleteUserTableDataApi,
  putUserTableDataApi,
  getBannertypeTableDataApi,
  postBannertypeTableApi,
  putBannertypeTableApi,
  getQiniuTokenApi,
  deleteBannertypeTableApi,
  getNewstypeApi,
  postNewstypeApi,
  putNewstypeApi,
  deleteNewsListApi,
  getSettingApi,
  putSettingApi,
  putNewsApi,
  getLoginApi
}

// export default {
//   myserver
// }
