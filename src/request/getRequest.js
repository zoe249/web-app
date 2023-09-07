// /*
//  * @Description: 封装request
//  * @Author: wangdandi
//  * @Date: 2022-03-04
//  */
// import server from '../api/httpServe.js'
// // import qs from 'qs'
// function Myserver() {
//   // 这是一个this的指向
//   this.server = server
//   this.nowhandle = null
// }
// Myserver.prototype.v = function (ob) {
//   this.nowhandle = ob
//   return this
// }
// // 解析路由
// Myserver.prototype.parseRouter = function (name, urlOb) {
//   // name是传送的值名称
//   // urlOb是传送的路由
//   // 将传送的字符串变成一个空对象，this指向一个myserver实例
//   this[name] = {}
//   var ob = this[name]
//   // 循环js文件中的方法名称然后进行赋值操作
//   Object.keys(urlOb).forEach((item) => {
//     ob[item] = this.sendMes.bind(this, name, item, urlOb[item])
//     // name是模块名，item是接口名
//   })
// }
// Myserver.prototype.sendMes = function (moduleName, name, url, config) {
//   // moduleName 模块名
//   // name接口名
//   // config配置属性是对传值进行的配置
//   var configs = config || {}
//   var type = configs.type || 'get'
//   var data = configs.data || {}
//   var bindName = configs.bindName || name
//   // 设置所传的contenttype类型
//   var responseType = configs.responseType || ''
// }
// // 传递id属性
// if (configs.idInfo !== undefined) {
//   var idInfo = configs.idInfo
// } else {
//   idInfo = ''
// }
// // 路径中存在在id属性后面的路径值
// var urlInfo = configs.urlInfo || ''
// var self = this
// // axios有请求拦截
// // 处理数据，绑定前处理，和绑定处理
// var before = function (msg) {
//   return msg
// }
// var defaultFu = function (msg) {
//   self.nuwhandle[bindName] = msg
// }
// var success = configs.success || defaultFu
// // callback是数据处理的，res是数据的返回defaultFn是函数的引用在success中可以使用defaultFn函数
// var callback = function (res) {
//   success(res, defaultFu)
// }
// var state = {
//   get: function () {
//   }
// }
// export default new Myserver()
